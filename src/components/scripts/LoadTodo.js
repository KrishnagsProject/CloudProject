var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-1"
});

console.log("Writing entries to todo table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var todoData = 
  JSON.parse(fs.readFileSync('../data/todo.json', 'utf8'));
console.log(todoData)
  todoData.forEach(function(todo) {
  var params = {
    TableName: "ToDo",
    Item: {
        "name":todo.name,
        "id":todo.id,
        "checked":todo.checked,
        "userEmail":todo.userEmail
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for menu links",
      todo.id, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", todo.id, "to table.")
  });
});