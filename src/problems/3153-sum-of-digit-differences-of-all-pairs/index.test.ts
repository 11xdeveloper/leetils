import { describe, expect, it } from "bun:test";
import { sumOfDigitDifferencesOfAllPairs as sumDigitDifferences } from ".";

describe("3153. Sum of Digit Differences of All Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumDigitDifferences([13, 23, 12])).toBe(4);
		expect(sumDigitDifferences([10, 10, 10, 10])).toBe(0);
	});
});
