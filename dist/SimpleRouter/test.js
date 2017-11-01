"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var index_1 = require("./index");
describe('SimpleRouter', function () {
    var createRouter = function () { return new index_1.default([
        { name: 'test_route', path: '/test/route/', method: 'get' },
        { name: 'with_params', path: '/test/route/{param}', method: 'get' }
    ]); };
    it('should generate simple url', function () {
        var router = createRouter();
        var route = router.generate('test_route');
        chai_1.expect(route.path).to.equal('/test/route/');
    });
    it('should throw on nonexistent route', function () {
        var router = createRouter();
        chai_1.expect(function () { return router.generate('nonexistent'); }).to.throw();
    });
    it('should add querystring params', function () {
        var router = createRouter();
        var route = router.generate('test_route', { test: 123, tost: 321 });
        chai_1.expect(route.path).to.equal('/test/route/?test=123&tost=321');
    });
    it('should replace route params', function () {
        var router = createRouter();
        var route = router.generate('with_params', { param: 'foo' });
        chai_1.expect(route.path).to.equal('/test/route/foo');
    });
    it('should throw when no (required) params given', function () {
        var router = createRouter();
        chai_1.expect(function () { return router.generate('with_params'); }).to.throw();
    });
});
