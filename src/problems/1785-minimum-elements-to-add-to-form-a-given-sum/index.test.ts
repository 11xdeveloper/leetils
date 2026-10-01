import { describe, expect, it } from "bun:test";
import { minimumElementsToAddToFormAGivenSum as minElements } from ".";

describe("1785. Minimum Elements to Add to Form a Given Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minElements([1, -1, 1], 3, -4)).toBe(2);
		expect(minElements([1, -10, 9, 1], 100, 0)).toBe(1);
	});

	it("returns 0 when the sum already matches", () => {
		expect(minElements([2, 3], 1, 5)).toBe(0);
	});
});
