"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var QueryGenerator_1 = require("../QueryGenerator");
var ParamMatcher_1 = require("../ParamMatcher");
var SimpleRouter = /** @class */ (function () {
    function SimpleRouter(routes, config) {
        this.config = __assign({}, this.getDefaultConfig(), config);
        this.routes = routes;
    }
    SimpleRouter.prototype.getDefaultConfig = function () {
        return {
            queryGenerator: new QueryGenerator_1.default(),
            paramMatcher: new ParamMatcher_1.default(),
        };
    };
    SimpleRouter.prototype.generate = function (name, params) {
        if (params === void 0) { params = {}; }
        var route = this.routes.filter(function (_a) {
            var _name = _a.name;
            return _name === name;
        }).shift();
        if (route === undefined) {
            throw new Error("Route " + name + " not found");
        }
        var method = route.method;
        var path = route.path;
        path = this.applyParams(path, params);
        return { method: method, path: path };
    };
    SimpleRouter.prototype.applyParams = function (path, params) {
        var _a = this.config.paramMatcher.create(path, params), match = _a.match, notIncluded = _a.notIncluded;
        var query = this.config.queryGenerator.generate(notIncluded);
        if (!query) {
            return match;
        }
        return match + "?" + query;
    };
    return SimpleRouter;
}());
exports.default = SimpleRouter;
