import { describe, expect, it } from "bun:test";
import { minimumNumberOfPrimesToSumToTarget as minNumberOfPrimes } from ".";

describe("3610. Minimum Number of Primes to Sum to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumberOfPrimes(10, 2)).toBe(4);
		expect(minNumberOfPrimes(15, 5)).toBe(3);
		expect(minNumberOfPrimes(7, 6)).toBe(1);
	});

	it("returns -1 when the primes can't reach the target", () => {
		expect(minNumberOfPrimes(3, 1)).toBe(-1);
	});
});
