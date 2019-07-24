"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var Logger_1 = __importDefault(require("./Logger"));
var RequestHandler_1 = __importDefault(require("./RequestHandler"));
var port = process.argv[2] || 3000;
var version = require("../package.json")["version"];
var logger = new Logger_1.default(console.log, console.table);
var handler = new RequestHandler_1.default(logger);
App_1.default.all("/*", handler.handle);
App_1.default.listen(port, function () {
    console.log("HTTP request inspector " + version);
    console.log("Listening for HTTP requests on all endpoints on port " + port);
});
exports.default = App_1.default;
