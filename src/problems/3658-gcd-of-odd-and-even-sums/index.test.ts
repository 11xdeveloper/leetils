import { describe, expect, it } from "bun:test";
import { gcdOfOddAndEvenSums as gcdOfOddEvenSums } from ".";

describe("3658. GCD of Odd and Even Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(gcdOfOddEvenSums(4)).toBe(4);
		expect(gcdOfOddEvenSums(5)).toBe(5);
	});

	it("matches computing the sums", () => {
		const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
		for (let n = 1; n <= 50; n++)
			expect(gcdOfOddEvenSums(n)).toBe(gcd(n * n, n * (n + 1)));
	});
});
