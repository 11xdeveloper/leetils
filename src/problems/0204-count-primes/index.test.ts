import { describe, expect, it } from "bun:test";
import { countPrimes } from ".";

const isPrime = (n: number): boolean => {
	if (n < 2) return false;
	for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
	return true;
};

describe("204. Count Primes", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPrimes(10)).toBe(4);
		expect(countPrimes(0)).toBe(0);
		expect(countPrimes(1)).toBe(0);
	});

	it("counts primes strictly less than n", () => {
		expect(countPrimes(2)).toBe(0);
		expect(countPrimes(3)).toBe(1);
		expect(countPrimes(11)).toBe(4);
	});

	it("matches trial division for every n up to 2000", () => {
		let count = 0;
		for (let n = 0; n <= 2000; n++) {
			expect(countPrimes(n)).toBe(count);
			if (isPrime(n)) count++;
		}
	});

	it("handles the constraint of 5 × 10^6", () => {
		// π(5,000,000) = 348,513.
		expect(countPrimes(5_000_000)).toBe(348513);
	});
});
