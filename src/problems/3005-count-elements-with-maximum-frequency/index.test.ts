import { describe, expect, it } from "bun:test";
import { countElementsWithMaximumFrequency } from ".";

describe("3005. Count Elements With Maximum Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(countElementsWithMaximumFrequency([1, 2, 2, 3, 1, 4])).toBe(4);
		expect(countElementsWithMaximumFrequency([1, 2, 3, 4, 5])).toBe(5);
	});
});
