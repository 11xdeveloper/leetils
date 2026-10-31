import { describe, expect, it } from "bun:test";
import { undefinedToNull } from ".";

describe("2775. Undefined to Null", () => {
	it("solves the examples from the problem statement", () => {
		expect(undefinedToNull({ a: undefined, b: 3 })).toEqual({ a: null, b: 3 });
		expect(undefinedToNull({ a: undefined, b: ["a", undefined] })).toEqual({
			a: null,
			b: ["a", null],
		});
	});

	it("fills holes in arrays and handles nesting", () => {
		// biome-ignore lint/suspicious/noSparseArray: testing holes
		expect(undefinedToNull([1, , { c: [undefined] }])).toEqual([
			1,
			null,
			{ c: [null] },
		]);
		expect(undefinedToNull(undefined)).toBeNull();
	});
});
