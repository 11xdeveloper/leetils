import { describe, expect, it } from "bun:test";
import { sumOfLargestPrimeSubstrings as sumOfLargestPrimes } from ".";

describe("3556. Sum of Largest Prime Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfLargestPrimes("12234")).toBe(1469);
		expect(sumOfLargestPrimes("111")).toBe(11);
	});
});
