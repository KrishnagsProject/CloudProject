var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-1"
});

console.log("Writing entries to jobs table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var jobsData = 
  JSON.parse(fs.readFileSync('../data/job.json', 'utf8'));

  jobsData.forEach(function(job) {
  var params = {
    TableName: "Jobs",
    Item: {
        "companyName":job.companyName,
        "role":job.role,
        "location":job.location,
        "status":job.status,
        "links":job.links,
        "userEmail":job.userEmail,
        "modifiedDate":job.modifiedDate,
        "appliedDate":job.appliedDate,
        "notes":job.notes,
        "description":job.description,
        "id":job.id
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for menu links",
      job.id, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", job.id, "to table.")
  });
});