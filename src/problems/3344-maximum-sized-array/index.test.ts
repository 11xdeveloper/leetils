import { describe, expect, it } from "bun:test";
import { maximumSizedArray as maxSizedArray } from ".";

/** Adds up the array directly. */
const total = (n: number): number => {
	let sum = 0;
	for (let i = 0; i < n; i++)
		for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) sum += i * (j | k);
	return sum;
};

describe("3344. Maximum Sized Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSizedArray(10)).toBe(2);
		expect(maxSizedArray(0)).toBe(1);
	});

	it("matches adding up small arrays", () => {
		const sums = Array.from({ length: 20 }, (_, n) => total(n + 1));
		for (const s of [0, 1, 5, 10, 100, 1000, 12345, 99999, 1e6]) {
			let best = 1;
			sums.forEach((sum, i) => {
				if (sum <= s) best = i + 1;
			});
			expect(maxSizedArray(s)).toBe(best);
		}
	});

	it("handles s = 10^15", () => {
		expect(maxSizedArray(1e15)).toBeGreaterThan(1000);
	});
});
