import { describe, expect, it } from "bun:test";
import { consecutiveNumbersSum } from ".";

describe("829. Consecutive Numbers Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(consecutiveNumbersSum(5)).toBe(2);
		expect(consecutiveNumbersSum(9)).toBe(3);
		expect(consecutiveNumbersSum(15)).toBe(4);
	});

	it("matches trying every starting number up to n = 2,000", () => {
		for (let n = 1; n <= 2000; n++) {
			let ways = 0;
			for (let start = 1; start <= n; start++) {
				let sum = 0;
				for (let x = start; sum < n; x++) sum += x;
				if (sum === n) ways++;
			}
			expect(consecutiveNumbersSum(n)).toBe(ways);
		}
	});

	it("handles the largest input", () => {
		// 10^9 = 2^9 · 5^9 has 10 odd divisors, one per way.
		expect(consecutiveNumbersSum(10 ** 9)).toBe(10);
	});
});
