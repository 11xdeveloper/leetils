import { describe, expect, it } from "bun:test";
import { compactObject } from ".";

describe("2705. Compact Object", () => {
	it("solves the examples from the problem statement", () => {
		expect(compactObject([null, 0, false, 1])).toEqual([1]);
		expect(compactObject({ a: null, b: [false, 1] })).toEqual({ b: [1] });
		expect(compactObject([null, 0, 5, [0], [false, 16]])).toEqual([
			5,
			[],
			[16],
		]);
	});

	it("keeps empty objects and drops empty strings", () => {
		expect(compactObject({ a: {}, b: "", c: [{ d: 0 }] })).toEqual({
			a: {},
			c: [{}],
		});
	});
});
