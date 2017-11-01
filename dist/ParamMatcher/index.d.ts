import { RouteParams } from '../SimpleRouter';
export interface MatchedParams {
    [name: string]: string;
}
export interface MatchResult {
    match: string;
    notIncluded: RouteParams;
}
export default class ParamMatcher {
    protected regex: RegExp;
    constructor(regex?: RegExp);
    protected resetRegex(): RegExp;
    match(path: string): MatchedParams;
    create(path: string, args: RouteParams): MatchResult;
}
