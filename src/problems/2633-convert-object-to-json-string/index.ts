type Json = null | boolean | number | string | readonly Json[] | JsonObject;
type JsonObject = { readonly [key: string]: Json };

/**
 * 2633. Convert Object to JSON String
 *
 * Serialise a JSON value to a string with no whitespace, like
 * `JSON.stringify`, without using it. Object keys keep their order.
 *
 * Recurse over the value, quoting strings and escaping quotes, backslashes
 * and control characters in them.
 *
 * @see https://leetcode.com/problems/convert-object-to-json-string/
 * @difficulty Medium
 * @timeComplexity O(n), for the length of the output
 * @spaceComplexity O(n)
 *
 * @example
 * convertObjectToJsonString({ y: 1, x: [true, null, "a"] }); // '{"y":1,"x":[true,null,"a"]}'
 */
export function convertObjectToJsonString(object: Json): string {
	if (object === null) return "null";
	if (typeof object === "string") return quote(object);
	if (typeof object !== "object") return String(object);
	if (Array.isArray(object))
		return `[${object.map(convertObjectToJsonString).join(",")}]`;
	const entries = Object.entries(object as JsonObject).map(
		([key, value]) => `${quote(key)}:${convertObjectToJsonString(value)}`,
	);
	return `{${entries.join(",")}}`;
}

const ESCAPES: Readonly<Record<string, string>> = {
	'"': '\\"',
	"\\": "\\\\",
	"\b": "\\b",
	"\f": "\\f",
	"\n": "\\n",
	"\r": "\\r",
	"\t": "\\t",
};

const quote = (text: string): string => {
	let result = '"';
	for (const char of text) {
		const code = char.charCodeAt(0);
		result +=
			ESCAPES[char] ??
			(code < 0x20 ? `\\u${code.toString(16).padStart(4, "0")}` : char);
	}
	return `${result}"`;
};
