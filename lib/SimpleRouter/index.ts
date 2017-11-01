import QueryGenerator from '../QueryGenerator'
import ParamMatcher from '../ParamMatcher'

export interface RouteDefinition {
  name: string;
  path: string;
  method: string;
}

export interface GeneratedRoute {
  path: string;
  method: string;
}
export interface RouteParams {
  [name: string]: any;
}

export interface SimpleRouterConfig {
  queryGenerator: QueryGenerator,
  paramMatcher: ParamMatcher,
}

export default class SimpleRouter {
  protected routes: RouteDefinition[];
  protected config: SimpleRouterConfig;

  constructor (routes: RouteDefinition[], config?: Partial<SimpleRouterConfig>) {
    this.config = {...this.getDefaultConfig(), ...config};
    this.routes = routes;
  }

  protected getDefaultConfig (): SimpleRouterConfig {
    return {
      queryGenerator: new QueryGenerator(),
      paramMatcher: new ParamMatcher(),
    }
  }

  public generate (name: string, params: RouteParams = {}): GeneratedRoute {
    const route = this.routes.filter(({name: _name}) => _name === name).shift();
    
    if (route === undefined) {
      throw new Error(`Route ${name} not found`);
    }

    const {method} = route;
    let {path} = route;

    path = this.applyParams(path, params);

    return {method, path}
  }

  protected applyParams (path: string, params: RouteParams): string {
    const {match, notIncluded} = this.config.paramMatcher.create(path, params);
    const query = this.config.queryGenerator.generate(notIncluded);
    if (!query) {
      return match;
    }
    return `${match}?${query}`;
  }
}