type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const ESCAPES: Readonly<Record<string, string>> = {
	'"': '"',
	"\\": "\\",
	"/": "/",
	b: "\b",
	f: "\f",
	n: "\n",
	r: "\r",
	t: "\t",
};

/**
 * 2759. Convert JSON String to Object
 *
 * Parse a valid JSON string into the value it represents, like `JSON.parse`,
 * without using it.
 *
 * A recursive descent parser over the string, with one function per kind of
 * value and a shared position.
 *
 * @see https://leetcode.com/problems/convert-json-string-to-object/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * convertJsonStringToObject('{"a":[1,true,null,"x"]}'); // { a: [1, true, null, "x"] }
 */
export function convertJsonStringToObject(str: string): Json {
	let i = 0;

	const skipWhitespace = (): void => {
		while (" \t\n\r".includes(str.charAt(i)) && i < str.length) i++;
	};

	const parseString = (): string => {
		i++;
		let result = "";
		while (str[i] !== '"') {
			const char = str.charAt(i++);
			if (char !== "\\") result += char;
			else {
				const code = str.charAt(i++);
				if (code === "u") {
					result += String.fromCharCode(
						Number.parseInt(str.slice(i, i + 4), 16),
					);
					i += 4;
				} else result += ESCAPES[code] ?? code;
			}
		}
		i++;
		return result;
	};

	const parseValue = (): Json => {
		skipWhitespace();
		const char = str[i];
		if (char === '"') return parseString();
		if (char === "[") {
			i++;
			const array: Json[] = [];
			skipWhitespace();
			if (str[i] === "]") {
				i++;
				return array;
			}
			for (;;) {
				array.push(parseValue());
				skipWhitespace();
				if (str[i++] === "]") return array;
			}
		}
		if (char === "{") {
			i++;
			const object: { [key: string]: Json } = {};
			skipWhitespace();
			if (str[i] === "}") {
				i++;
				return object;
			}
			for (;;) {
				skipWhitespace();
				const key = parseString();
				skipWhitespace();
				i++;
				object[key] = parseValue();
				skipWhitespace();
				if (str[i++] === "}") return object;
			}
		}
		for (const [word, value] of [
			["true", true],
			["false", false],
			["null", null],
		] as const)
			if (str.startsWith(word, i)) {
				i += word.length;
				return value;
			}
		const start = i;
		while (i < str.length && "+-.0123456789eE".includes(str.charAt(i))) i++;
		return Number(str.slice(start, i));
	};

	return parseValue();
}
