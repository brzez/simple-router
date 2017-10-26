import 'mocha';
import { expect } from 'chai';

import QueryGenerator from './index'

describe('QueryGenerator', () => {
  const g = new QueryGenerator();

  it('should generate query params', () => {
    const result = g.generate({
      a: 'foo',
      b: 'bar',
    })

    expect(result).to.equal('a=foo&b=bar');
  })
  
  it('should urlencode query params', () => {
    const result = g.generate({
      a: '|',
      b: '&',
    })

    expect(result).to.equal('a=%7C&b=%26');
  })
  
  it('handle arrays', () => {
    const result = g.generate({
      a: [
        1, 2, 3, '&'
      ],
      b: 'bar'
    })

    expect(result).to.equal('a[]=1&a[]=2&a[]=3&a[]=%26&b=bar');
  })
});