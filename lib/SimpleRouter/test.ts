import 'mocha';
import { expect } from 'chai';

import SimpleRouter from './index'

describe('SimpleRouter', () => {
  const createRouter = () => new SimpleRouter([
    {name: 'test_route', path: '/test/route/', method: 'get'},
    {name: 'with_params', path: '/test/route/:param', method: 'get'}
  ]);

  it('should generate simple url', () => {
    const router = createRouter();
    const route = router.generate('test_route')

    expect(route.path).to.equal('/test/route/');
  })

  it('should throw on nonexistent route', () => {
    const router = createRouter();

    expect(() => router.generate('nonexistent')).to.throw();
  })

  it('should add querystring params', () => {
    const router = createRouter();
    const route = router.generate('test_route', {test: 123, tost: 321})

    expect(route.path).to.equal('/test/route?test=123&tost=321');
  })

  it('should replace route params', () => {
    const router = createRouter();
    const route = router.generate('with_params', {param: 'foo'})

    expect(route.path).to.equal('/test/route/foo');
  })

  it('should throw when no (required) params given', () => {
    const router = createRouter();

    expect(() => router.generate('with_params')).to.throw();
  })
});