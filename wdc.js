(function() {
  
  var myConnector = tableau.makeConnector();
  
  myConnector.getSchema = function (schemaCallback) {
  
  var cols = [
      {
        id: "Id",
        alias: "Organization Id",
        dataType: tableau.dataTypeEnum
          .string
      },
	  {
        id: "Type",
        alias: "Type",
        dataType: tableau.dataTypeEnum
          .string
      },
	  {
        id: "OrganizationName",
        alias: "Organization Name",
        dataType: tableau.dataTypeEnum
          .string
      },
	  {
		 id: "OrganizationType",
		 alias: "Organization Type",
		 dataType: tableau.dataTypeEnum
			.string
	  },
	  {
		  id: "TradingName",
		  alias: "Trading Name",
		  dataType: tableau.dataTypeEnum
			.string
	  },
	  {
		  id: "Language",
		  alias: "Language",
		  dataType: tableau.dataTypeEnum
			.string
	  }
      
    ];
    var tableInfo = {
      id: "Organizations",
      alias: "Organizations",
      columns: cols
    };
    schemaCallback([tableInfo]);
  };
  
  myConnector.getData = function(table, doneCallback) {
    $.getJSON(
      "http://10.150.4.4:3010/api/organizations",
      function(resp) {
        var jsonData = resp.data;
		tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = jsonData.length; i < len; i++) {
		  tableData.push({
				"Id": jsonData[i]["id"],
				"Type": jsonData[i]["type"]
			  });	
		  var attrData = i.attributes;
		  for (var i = 0, len = attrData.length; i < len; i++) {
			  tableData.push({
				"OrganizationName" : attrData[i]["formatted-name"],  
				"OrganizationType": attrData[i]["organization-type"],
				"TradingName": attrData[i]["trading-name"],
				"Language": attrData[i]["language"]
			  });
		  }
		}
        
		table.appendRows(tableData);
        
		doneCallback();
		
      });
  };
  
  tableau.registerConnector(myConnector);
  
  $(document).ready(function() {
    $("#submitButton").click(
      function() {
        tableau.connectionName = "Organizations";
        tableau.submit();
      });
  });
  
})();