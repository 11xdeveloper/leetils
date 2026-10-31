import { describe, expect, it } from "bun:test";
import { largestPrimeFromConsecutivePrimeSum as largestPrime } from ".";

describe("3770. Largest Prime from Consecutive Prime Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPrime(20)).toBe(17);
		expect(largestPrime(2)).toBe(2);
	});

	it("returns 0 below 2", () => {
		expect(largestPrime(1)).toBe(0);
		expect(largestPrime(100)).toBe(41);
	});
});
