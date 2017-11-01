"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryGenerator = /** @class */ (function () {
    function QueryGenerator() {
    }
    QueryGenerator.prototype.encode = function (key, value, postfix) {
        var _this = this;
        if (postfix === void 0) { postfix = ''; }
        if (Array.isArray(value)) {
            return value.map(function (v) { return _this.encode(key, v, '[]'); }).join('&');
        }
        var uriEncoded = encodeURIComponent(value);
        return "" + key + postfix + "=" + uriEncoded;
    };
    QueryGenerator.prototype.generate = function (params) {
        var _this = this;
        var result = [];
        Object.keys(params).forEach(function (key) {
            var encoded = _this.encode(key, params[key]);
            result.push(encoded);
        });
        return result.join('&');
    };
    return QueryGenerator;
}());
exports.default = QueryGenerator;
