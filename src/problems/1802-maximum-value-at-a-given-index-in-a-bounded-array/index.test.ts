import { describe, expect, it } from "bun:test";
import { maximumValueAtAGivenIndexInABoundedArray as maxValue } from ".";

/** Tries each peak, summing the cheapest array directly. */
const byBruteForce = (n: number, index: number, maxSum: number): number => {
	let best = 0;
	for (let peak = 1; peak <= maxSum; peak++) {
		let sum = 0;
		for (let i = 0; i < n; i++) sum += Math.max(1, peak - Math.abs(i - index));
		if (sum <= maxSum) best = peak;
	}
	return best;
};

describe("1802. Maximum Value at a Given Index in a Bounded Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue(4, 2, 6)).toBe(2);
		expect(maxValue(6, 1, 10)).toBe(3);
	});

	it("matches trying every peak for small inputs", () => {
		for (let n = 1; n <= 8; n++) {
			for (let index = 0; index < n; index++) {
				for (let maxSum = n; maxSum <= 40; maxSum++)
					expect(maxValue(n, index, maxSum)).toBe(
						byBruteForce(n, index, maxSum),
					);
			}
		}
	});

	it("handles the largest inputs", () => {
		expect(maxValue(1, 0, 1_000_000_000)).toBe(1_000_000_000);
		expect(maxValue(1_000_000_000, 0, 1_000_000_000)).toBe(1);
	});
});
