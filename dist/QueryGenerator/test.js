"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var index_1 = require("./index");
describe('QueryGenerator', function () {
    var g = new index_1.default();
    it('should generate query params', function () {
        var result = g.generate({
            a: 'foo',
            b: 'bar',
        });
        chai_1.expect(result).to.equal('a=foo&b=bar');
    });
    it('should urlencode query params', function () {
        var result = g.generate({
            a: '|',
            b: '&',
        });
        chai_1.expect(result).to.equal('a=%7C&b=%26');
    });
    it('handle arrays', function () {
        var result = g.generate({
            a: [
                1, 2, 3, '&'
            ],
            b: 'bar'
        });
        chai_1.expect(result).to.equal('a[]=1&a[]=2&a[]=3&a[]=%26&b=bar');
    });
});
