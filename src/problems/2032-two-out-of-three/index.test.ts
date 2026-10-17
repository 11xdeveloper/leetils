import { describe, expect, it } from "bun:test";
import { twoOutOfThree } from ".";

describe("2032. Two Out of Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(twoOutOfThree([1, 1, 3, 2], [2, 3], [3])).toEqual([2, 3]);
		expect(twoOutOfThree([3, 1], [2, 3], [1, 2])).toEqual([1, 2, 3]);
		expect(twoOutOfThree([1, 2, 2], [4, 3, 3], [5])).toEqual([]);
	});
});
