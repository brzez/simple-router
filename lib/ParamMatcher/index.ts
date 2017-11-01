import {RouteParams} from '../SimpleRouter'

export interface MatchedParams {
	[name: string]: string;
}

export default class ParamMatcher {
	protected regex: RegExp;

	constructor (regex = /({(.*?)})/g) {
		this.regex = regex;
	}

	protected resetRegex (): RegExp {
		this.regex.lastIndex = 0;
		return this.regex;
	}

	match (path: string): MatchedParams {
		const matched: MatchedParams = {};

		const rex = this.resetRegex();

		let result;
		while ((result = rex.exec(path)) !== null) {
			const name = result[2];
			const match = result[1];
			if (name in matched) {
				throw new Error(`Key ${name} already exists in ${path}`);
			}
			matched[name] = match;
		}

		return matched;
	}

	create (path: string, args: RouteParams): any {

	}
}