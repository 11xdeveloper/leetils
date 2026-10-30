import { describe, expect, it } from "bun:test";
import { minimizeTheMaximumDifferenceOfPairs as minimizeMax } from ".";

describe("2616. Minimize the Maximum Difference of Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeMax([10, 1, 2, 7, 1, 3], 2)).toBe(1);
		expect(minimizeMax([4, 2, 1, 2], 1)).toBe(0);
	});

	it("needs no pairs when p is 0", () => {
		expect(minimizeMax([1, 100], 0)).toBe(0);
	});
});
