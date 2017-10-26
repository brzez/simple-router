import 'mocha';
import { expect } from 'chai';

import ParamMatcher from './index'

describe('ParamMatcher', () => {
  const matcher = new ParamMatcher();
  describe('#match', () => {
    it('matches params', () => {
      const result = matcher.match('/foo/{test}/{a_2}/{thing}');
    })

    it('throws on duplicate params', () => {
      expect(
        matcher.match('/{a}/{a}')
      ).to.throw();
    })
  })

  describe('#create', () => {
    it('sets params', () => {
      const result = matcher.create('/{foo}/{bar}', {foo: 123, bar: 321});
      expect(result).to.equal('/123/321');
    })

    it('throws on missing params', () => {
      const result = () => matcher.create('/{foo}/{bar}', {foo: 123});
      expect(result).to.throw();
    })
  })
});