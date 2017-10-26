
export interface QueryGeneratorInterface {
  generate (params: object): string
}

export default class QueryGenerator implements QueryGeneratorInterface {
  generate (params: object): string {
    return '';    
  }
}