"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var RequestHandler = /** @class */ (function () {
    function RequestHandler(logger) {
        var _this = this;
        this.colorMap = {
            POST: chalk_1.default.bgGreen,
            GET: chalk_1.default.bgBlue,
            PUT: chalk_1.default.bgYellow.black,
            DELETE: chalk_1.default.bgRed
        };
        this.handle = function (req, res) {
            _this.logTime("[" + new Date().toLocaleTimeString() + "]");
            _this.log("Received " + _this.color(req.method) + " request from " + req.ip + " at " + req.path + ".\n");
            _this.logParams(req.query);
            _this.logHeaders(req.headers);
            _this.logBody(req.body);
            _this.log("------------");
            res.status(200);
            res.send(req.body);
            _this.clearLog();
        };
        this.log = function (subject) {
            _this.logger.log(subject);
        };
        this.clearLog = function () { return _this.logger.clear(); };
        this.color = function (httpMethod) {
            var f = _this.colorMap[httpMethod];
            return f ? f(httpMethod) : chalk_1.default.bgCyan(httpMethod);
        };
        this.logParams = function (params) {
            if (params) {
                _this.logger.log("Parameters:\n");
                _this.logger.logTable(params);
            }
        };
        this.logBody = function (body) {
            if (body) {
                _this.logger.log("Body:\n");
                _this.logger.log(body.length ? body.toString("utf-8") : "[empty]");
            }
            else {
                _this.logger.log("No body attached to request");
            }
        };
        this.logHeaders = function (headers) {
            _this.logger.log("Headers:\n");
            _this.logger.logTable(headers);
        };
        this.logTime = function (time) {
            _this.logger.log(time);
        };
        this.logger = logger;
    }
    return RequestHandler;
}());
exports.default = RequestHandler;
