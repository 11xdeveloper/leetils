import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { convertObjectToJsonString } from ".";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

describe("2633. Convert Object to JSON String", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertObjectToJsonString({ y: 1, x: 2 })).toBe('{"y":1,"x":2}');
		expect(
			convertObjectToJsonString({ a: "str", b: -12, c: true, d: null }),
		).toBe('{"a":"str","b":-12,"c":true,"d":null}');
		expect(
			convertObjectToJsonString({ key: { a: 1, b: [{}, null, "Hello"] } }),
		).toBe('{"key":{"a":1,"b":[{},null,"Hello"]}}');
		expect(convertObjectToJsonString(true)).toBe("true");
	});

	it("matches JSON.stringify on random values", () => {
		const random = createRandom(2633);
		const build = (depth: number): Json => {
			switch (random.int(0, depth > 0 ? 6 : 4)) {
				case 0:
					return null;
				case 1:
					return random.int(0, 1) === 1;
				case 2:
					return random.int(-1000, 1000) / random.int(1, 8);
				case 3:
				case 4:
					return random.string(random.int(0, 5), 'ab"\\\n\t\u0001é');
				case 5:
					return Array.from({ length: random.int(0, 3) }, () =>
						build(depth - 1),
					);
				default:
					return Object.fromEntries(
						Array.from({ length: random.int(0, 3) }, () => [
							random.string(random.int(0, 3), 'xy"'),
							build(depth - 1),
						]),
					);
			}
		};
		for (let i = 0; i < 300; i++) {
			const value = build(3);
			expect(convertObjectToJsonString(value)).toBe(JSON.stringify(value));
		}
	});
});
