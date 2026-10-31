import { describe, expect, it } from "bun:test";
import { countDigitAppearances as countDigitOccurrences } from ".";

describe("3895. Count Digit Appearances", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDigitOccurrences([12, 54, 32, 22], 2)).toBe(4);
		expect(countDigitOccurrences([1, 34, 7], 9)).toBe(0);
	});
});
