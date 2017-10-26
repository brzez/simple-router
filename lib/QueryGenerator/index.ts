
export interface QueryGeneratorInterface {
  generate (params: object): string
}

export interface Params {
  [key: string]: any;
}

export default class QueryGenerator implements QueryGeneratorInterface {
  protected encode (key: string, value: any, postfix: string = ''): string {
    if (Array.isArray(value)) {
      return value.map(v => this.encode(key, v, '[]')).join('&');
    }

    const uriEncoded = encodeURIComponent(value);
    return `${key}${postfix}=${uriEncoded}`;
  }

  generate (params: Params): string {
    const result: string[] = [];
    Object.keys(params).forEach(key => {
      const encoded = this.encode(key, params[key]);
      result.push(encoded)
    });
    return result.join('&');    
  }
}