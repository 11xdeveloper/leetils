import { describe, expect, it } from "bun:test";
import { sumOfTwoIntegers } from ".";

describe("371. Sum of Two Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfTwoIntegers(1, 2)).toBe(3);
		expect(sumOfTwoIntegers(2, 3)).toBe(5);
	});

	it("matches + for every pair in the constraint's range of -1000 to 1000, sampled", () => {
		for (let a = -1000; a <= 1000; a += 7) {
			for (let b = -1000; b <= 1000; b += 13)
				expect(sumOfTwoIntegers(a, b)).toBe(a + b);
		}
	});

	it("handles zero and opposites", () => {
		expect(sumOfTwoIntegers(0, 0)).toBe(0);
		expect(sumOfTwoIntegers(-1000, 1000)).toBe(0);
	});
});
