(function() {
  
  var myConnector = tableau.makeConnector();
  
  myConnector.getSchema = function (schemaCallback) {
  
  var cols = [
      {
        id: "Id",
        alias: "Order Id",
        dataType: tableau.dataTypeEnum
          .string
      },
	  {
        id: "status",
        alias: "Order Status",
        dataType: tableau.dataTypeEnum
          .string
      },
	  {
        id: "date",
        alias: "Order Date",
        dataType: tableau.dataTypeEnum
          .string
      }
      
    ];
    var tableInfo = {
      id: "Orders",
      alias: "Orders",
      columns: cols
    };
    schemaCallback([tableInfo]);
  };
  
  myConnector.getData = function(table, doneCallback) {
    $.getJSON(
      "https://rerukulla.github.io/orders.json",
      function(resp) {
        var jsonData = resp.data;
		alert("JsonDat : " + jsonData);
        tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = jsonData.length; i < len; i++) {
		  tableData.push({
			"Id": jsonData[i]["id"],
            "date": jsonData[i]["created-at"],
			"status": jsonData[i]["status"]
          });
		}
        
		table.appendRows(tableData);
        
		doneCallback();
		
      });
  };
  
  tableau.registerConnector(myConnector);
  
  $(document).ready(function() {
    $("#submitButton").click(
      function() {
        tableau.connectionName = "Orders";
        tableau.submit();
      });
  });
  
})();