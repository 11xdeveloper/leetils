import { describe, expect, it } from "bun:test";
import { libraryLateFeeCalculator as lateFee } from ".";

describe("3687. Library Late Fee Calculator", () => {
	it("solves the examples from the problem statement", () => {
		expect(lateFee([5, 1, 7])).toBe(32);
		expect(lateFee([1, 1])).toBe(2);
	});
});
