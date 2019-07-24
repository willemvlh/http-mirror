"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(logger, tableLogger) {
        this.logger = logger;
        this.tableLogger = tableLogger;
    }
    Logger.prototype.log = function (subject) {
        this.logger(subject);
    };
    Logger.prototype.logTable = function (subject) {
        this.tableLogger(subject);
    };
    return Logger;
}());
exports.Logger = Logger;
exports.default = Logger;
