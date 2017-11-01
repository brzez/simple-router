"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamMatcher = /** @class */ (function () {
    function ParamMatcher(regex) {
        if (regex === void 0) { regex = /({(.*?)})/g; }
        this.regex = regex;
    }
    ParamMatcher.prototype.resetRegex = function () {
        this.regex.lastIndex = 0;
        return this.regex;
    };
    ParamMatcher.prototype.match = function (path) {
        var matched = {};
        var rex = this.resetRegex();
        var result;
        while ((result = rex.exec(path)) !== null) {
            var name_1 = result[2];
            var match = result[1];
            if (name_1 in matched) {
                throw new Error("Key " + name_1 + " already exists in " + path);
            }
            matched[name_1] = match;
        }
        return matched;
    };
    ParamMatcher.prototype.create = function (path, args) {
        var matched = this.match(path);
        var notIncluded = {};
        var match = path;
        Object.keys(args).forEach(function (name) {
            var value = args[name];
            if (name in matched) {
                match = match.replace(matched[name], value);
                delete matched[name];
                return;
            }
            notIncluded[name] = value;
        });
        var missing = Object.keys(matched);
        if (missing.length > 0) {
            throw new Error("Missing params " + missing.join(',') + " for path " + path);
        }
        return { match: match, notIncluded: notIncluded };
    };
    return ParamMatcher;
}());
exports.default = ParamMatcher;
