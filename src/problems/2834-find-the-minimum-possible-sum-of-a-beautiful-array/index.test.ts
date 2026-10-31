import { describe, expect, it } from "bun:test";
import { findTheMinimumPossibleSumOfABeautifulArray as minimumPossibleSum } from ".";

describe("2834. Find the Minimum Possible Sum of a Beautiful Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPossibleSum(2, 3)).toBe(4);
		expect(minimumPossibleSum(3, 3)).toBe(8);
		expect(minimumPossibleSum(1, 1)).toBe(1);
	});

	it("reduces huge sums modulo 1e9 + 7", () => {
		const n = 1_000_000_000n;
		const expected = Number(((n * (n + 1n)) / 2n) % 1_000_000_007n);
		expect(minimumPossibleSum(1_000_000_000, 1_000_000_000_0)).toBe(expected);
	});
});
