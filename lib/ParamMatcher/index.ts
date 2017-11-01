import {RouteParams} from '../SimpleRouter'

export interface MatchedParams {
	[name: string]: string;
}

export interface MatchResult {
	match: string;
	notIncluded: RouteParams;
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

	create (path: string, args: RouteParams): MatchResult {
		const matched = this.match(path);
		const notIncluded: RouteParams = {};

		let match = path;

		Object.keys(args).forEach(name => {
			const value = args[name];
			if (name in matched) {
				match = match.replace(matched[name], value);
				delete matched[name];
				return
			}

			notIncluded[name] = value;
		});

		const missing = Object.keys(matched);
		if (missing.length > 0) {
			throw new Error(`Missing params ${missing.join(',')} for path ${path}`);
		}

		return {match, notIncluded};
	}
}