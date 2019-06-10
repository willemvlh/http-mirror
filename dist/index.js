"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var port = process.argv[2] || 3000;
var version = require("../package.json")["version"];
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var chalk_1 = __importDefault(require("chalk"));
var app = express_1.default();
app.use(body_parser_1.default.raw({ type: '*/*' }));
var colorMap = {
    "POST": chalk_1.default.bgGreen,
    "GET": chalk_1.default.bgBlue,
    "PUT": chalk_1.default.bgYellow.black,
    "DELETE": chalk_1.default.bgRed
};
var color = function (httpMethod) {
    var f = colorMap[httpMethod];
    return f ? f(httpMethod) : chalk_1.default.bgCyan(httpMethod);
};
var logBody = function (body) {
    console.log("Body:\n");
    console.log(body.length ? body.toString("utf-8") : "[empty]");
};
var logHeaders = function (headers) {
    console.log("Headers:\n");
    console.table(headers);
};
var logTime = function () {
    console.log("[" + (new Date()).toLocaleTimeString() + "]");
};
var handleRequest = function (req, res) {
    logTime();
    console.log("Received " + color(req.method) + " request from " + req.ip + " at " + req.path + ".\n");
    logHeaders(req.headers);
    logBody(req.body);
    console.log("------------");
    res.status(200);
    res.end(req.body);
};
app.all("/*", handleRequest);
app.listen(port);
console.log("HTTP request inspector " + version);
console.log("Listening for HTTP requests on all endpoints on port " + port);
