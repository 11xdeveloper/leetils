import { describe, expect, it } from "bun:test";
import { jsonDeepEqual } from ".";

describe("2628. JSON Deep Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(jsonDeepEqual({ x: 1, y: 2 }, { x: 1, y: 2 })).toBeTrue();
		expect(jsonDeepEqual({ y: 2, x: 1 }, { x: 1, y: 2 })).toBeTrue();
		expect(
			jsonDeepEqual({ x: null, L: [1, 2, 3] }, { x: null, L: ["1", "2", "3"] }),
		).toBeFalse();
		expect(jsonDeepEqual(true, false)).toBeFalse();
	});

	it("tells arrays and objects apart", () => {
		expect(jsonDeepEqual([1, 2], { 0: 1, 1: 2 })).toBeFalse();
		expect(jsonDeepEqual([], {})).toBeFalse();
		expect(jsonDeepEqual({ a: null }, { b: null })).toBeFalse();
		expect(jsonDeepEqual([[1, { a: [2] }]], [[1, { a: [2] }]])).toBeTrue();
		expect(jsonDeepEqual([1, 2], [2, 1])).toBeFalse();
		expect(jsonDeepEqual(null, {})).toBeFalse();
	});
});
