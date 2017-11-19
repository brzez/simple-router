# simple router

Easily generate routes with params & query string


## Usage

```js
import {SimpleRouter} from 'simple-router'

const routes = [
  {name: 'foo', path: '/foo/{param}', method: 'get'}
];

const router = new SimpleRouter(routes);


router.generate('test_route', {param: 'bar', baz: 321})

// will generate => /foo/bar?baz=321

```