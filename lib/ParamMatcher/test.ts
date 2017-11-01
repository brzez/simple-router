import 'mocha';
import { expect } from 'chai';

import ParamMatcher from './index'

describe('ParamMatcher', () => {
  const matcher = new ParamMatcher();
  describe('#match', () => {
    it('matches params', () => {
      const result = matcher.match('/foo/{test}/{a_2}/{thing}');
      expect(result).to.include({test: '{test}'})
      expect(result).to.include({a_2: '{a_2}'})
      expect(result).to.include({thing: '{thing}'})
    })

    it('throws on duplicate params', () => {
      expect(
        () => matcher.match('/{a}/{a}')
      ).to.throw();
    })
  })

  describe('#create', () => {
    it('sets params', () => {
      const {match} = matcher.create('/{foo}/{bar}', {foo: 123, bar: 321});
      expect(match).to.equal('/123/321');
    })

    it('throws on missing params', () => {
      expect(() => matcher.create('/{foo}/{bar}', {foo: 123})).to.throw();
    })
  })
});