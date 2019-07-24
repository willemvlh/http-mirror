"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var port = process.argv[2] || 3000;
var version = require("../package.json")["version"];
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var RequestHandler_1 = __importDefault(require("./RequestHandler"));
var Logger_1 = __importDefault(require("./Logger"));
var app = express_1.default();
app.use(body_parser_1.default.raw({ type: "*/*" }));
var logger = new Logger_1.default(console.log, console.table);
var handler = new RequestHandler_1.default(logger);
app.all("/*", handler.handle);
app.listen(port, function () {
    console.log("HTTP request inspector " + version);
    console.log("Listening for HTTP requests on all endpoints on port " + port);
});
exports.default = app;
