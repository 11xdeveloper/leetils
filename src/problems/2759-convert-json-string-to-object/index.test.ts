import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { convertJsonStringToObject } from ".";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

describe("2759. Convert JSON String to Object", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertJsonStringToObject('{"a":2,"b":[1,2,3]}')).toEqual({
			a: 2,
			b: [1, 2, 3],
		});
		expect(convertJsonStringToObject("true")).toBeTrue();
		expect(convertJsonStringToObject('[1,5,"false",{"a":2}]')).toEqual([
			1,
			5,
			"false",
			{ a: 2 },
		]);
	});

	it("handles whitespace, escapes and numbers", () => {
		expect(
			convertJsonStringToObject(
				' { "a\\"b" : [ -1.5e3 , 0 , "\\u00e9\\n" ] , "c": {} } ',
			),
		).toEqual({ 'a"b': [-1500, 0, "é\n"], c: {} });
		expect(convertJsonStringToObject("[[],[[]]]")).toEqual([[], [[]]]);
	});

	it("matches JSON.parse on random values", () => {
		const random = createRandom(2759);
		const build = (depth: number): Json => {
			switch (random.int(0, depth > 0 ? 6 : 4)) {
				case 0:
					return null;
				case 1:
					return random.int(0, 1) === 1;
				case 2:
					return random.int(-10000, 10000) / random.int(1, 16);
				case 3:
				case 4:
					return random.string(random.int(0, 5), 'ab"\\/\n\t\u0001é');
				case 5:
					return Array.from({ length: random.int(0, 3) }, () =>
						build(depth - 1),
					);
				default:
					return Object.fromEntries(
						Array.from({ length: random.int(0, 3) }, () => [
							random.string(random.int(0, 3), 'xy"\\'),
							build(depth - 1),
						]),
					);
			}
		};
		for (let i = 0; i < 300; i++) {
			const text = JSON.stringify(
				build(3),
				null,
				random.int(0, 1) === 1 ? 2 : 0,
			);
			expect(convertJsonStringToObject(text)).toEqual(JSON.parse(text));
		}
	});
});
