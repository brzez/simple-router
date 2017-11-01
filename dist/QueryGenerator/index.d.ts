export interface QueryGeneratorInterface {
    generate(params: object): string;
}
export interface Params {
    [key: string]: any;
}
export default class QueryGenerator implements QueryGeneratorInterface {
    protected encode(key: string, value: any, postfix?: string): string;
    generate(params: Params): string;
}
