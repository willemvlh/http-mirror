const port = process.argv[2] || 3000;
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.post("/*", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port);
console.log("Listening for POST requests on all endpoints on port " + port);
