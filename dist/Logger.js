"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(logger, tableLogger) {
        this.logger = logger;
        if (tableLogger === null) {
            this.tableLogger = logger;
        }
        else {
            this.tableLogger = tableLogger;
        }
    }
    Logger.prototype.logTable = function (subject) {
        this.tableLogger(subject);
    };
    Logger.prototype.log = function (subject) {
        this.logger(subject);
    };
    Logger.prototype.clear = function () { };
    return Logger;
}());
exports.Logger = Logger;
exports.default = Logger;
