import QueryGenerator from '../QueryGenerator';
import ParamMatcher from '../ParamMatcher';
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
    queryGenerator: QueryGenerator;
    paramMatcher: ParamMatcher;
}
export default class SimpleRouter {
    protected routes: RouteDefinition[];
    protected config: SimpleRouterConfig;
    constructor(routes: RouteDefinition[], config?: Partial<SimpleRouterConfig>);
    protected getDefaultConfig(): SimpleRouterConfig;
    generate(name: string, params?: RouteParams): GeneratedRoute;
    protected applyParams(path: string, params: RouteParams): string;
}
