import { describe, expect, it } from "bun:test";
import { sumOfSquareNumbers as judgeSquareSum } from ".";

describe("633. Sum of Square Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(judgeSquareSum(5)).toBeTrue();
		expect(judgeSquareSum(3)).toBeFalse();
	});

	it("matches a table of every sum of two squares up to 10,000", () => {
		const sums = new Set<number>();
		for (let a = 0; a <= 100; a++)
			for (let b = a; b <= 100; b++) sums.add(a * a + b * b);
		for (let c = 0; c <= 10_000; c++)
			expect(judgeSquareSum(c)).toBe(sums.has(c));
	});

	it("handles the largest input", () => {
		expect(judgeSquareSum(2 ** 31 - 1)).toBeFalse();
		expect(judgeSquareSum(46340 ** 2 + 1)).toBeTrue();
	});
});
