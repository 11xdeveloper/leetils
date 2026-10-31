import { describe, expect, it } from "bun:test";
import { checkIfAnyElementHasPrimeFrequency as checkPrimeFrequency } from ".";

describe("3591. Check if Any Element Has Prime Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPrimeFrequency([1, 2, 3, 4, 5, 4])).toBeTrue();
		expect(checkPrimeFrequency([1, 2, 3, 4, 5])).toBeFalse();
		expect(checkPrimeFrequency([2, 2, 2, 4, 4])).toBeTrue();
	});
});
