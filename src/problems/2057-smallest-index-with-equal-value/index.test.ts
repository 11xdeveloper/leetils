import { describe, expect, it } from "bun:test";
import { smallestIndexWithEqualValue as smallestEqual } from ".";

describe("2057. Smallest Index With Equal Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestEqual([0, 1, 2])).toBe(0);
		expect(smallestEqual([4, 3, 2, 1])).toBe(2);
		expect(smallestEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])).toBe(-1);
	});

	it("wraps indices past 9", () => {
		expect(smallestEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0])).toBe(10);
	});
});
