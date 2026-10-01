import { describe, expect, it } from "bun:test";
import { clumsyFactorial as clumsy } from ".";

describe("1006. Clumsy Factorial", () => {
	it("solves the examples from the problem statement", () => {
		expect(clumsy(4)).toBe(7);
		expect(clumsy(10)).toBe(12);
	});

	it("follows the pattern that settles in for larger n", () => {
		// For n > 4 the answer is n + 1, n + 2 or n - 1 depending on n % 4.
		for (let n = 5; n <= 200; n++)
			expect(clumsy(n)).toBe([n + 1, n + 2, n + 2, n - 1][n % 4] ?? 0);
		expect([1, 2, 3, 4].map(clumsy)).toEqual([1, 2, 6, 7]);
	});
});
