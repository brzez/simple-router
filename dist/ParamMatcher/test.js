"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var index_1 = require("./index");
describe('ParamMatcher', function () {
    var matcher = new index_1.default();
    describe('#match', function () {
        it('matches params', function () {
            var result = matcher.match('/foo/{test}/{a_2}/{thing}');
            chai_1.expect(result).to.include({ test: '{test}' });
            chai_1.expect(result).to.include({ a_2: '{a_2}' });
            chai_1.expect(result).to.include({ thing: '{thing}' });
        });
        it('throws on duplicate params', function () {
            chai_1.expect(function () { return matcher.match('/{a}/{a}'); }).to.throw();
        });
    });
    describe('#create', function () {
        it('sets params', function () {
            var match = matcher.create('/{foo}/{bar}', { foo: 123, bar: 321 }).match;
            chai_1.expect(match).to.equal('/123/321');
        });
        it('throws on missing params', function () {
            chai_1.expect(function () { return matcher.create('/{foo}/{bar}', { foo: 123 }); }).to.throw();
        });
    });
});
