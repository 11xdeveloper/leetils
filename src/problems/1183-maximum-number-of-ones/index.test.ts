import { describe, expect, it } from "bun:test";
import { maximumNumberOfOnes } from ".";

/** Tries every binary matrix. */
const byBruteForce = (
	width: number,
	height: number,
	side: number,
	maxOnes: number,
) => {
	let best = 0;
	for (let bits = 0; bits < 2 ** (width * height); bits++) {
		const at = (x: number, y: number) => (bits >> (y * width + x)) & 1;
		let fits = true;
		for (let x = 0; x + side <= width && fits; x++) {
			for (let y = 0; y + side <= height && fits; y++) {
				let ones = 0;
				for (let dx = 0; dx < side; dx++)
					for (let dy = 0; dy < side; dy++) ones += at(x + dx, y + dy);
				if (ones > maxOnes) fits = false;
			}
		}
		if (!fits) continue;
		let ones = 0;
		for (let rest = bits; rest > 0; rest &= rest - 1) ones++;
		best = Math.max(best, ones);
	}
	return best;
};

describe("1183. Maximum Number of Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumNumberOfOnes(3, 3, 2, 1)).toBe(4);
		expect(maximumNumberOfOnes(3, 3, 2, 2)).toBe(6);
	});

	it("handles the largest matrix", () => {
		expect(maximumNumberOfOnes(100, 100, 100, 10000)).toBe(10000);
		expect(maximumNumberOfOnes(100, 100, 1, 0)).toBe(0);
		expect(maximumNumberOfOnes(100, 100, 3, 1)).toBe(34 * 34);
	});

	it("matches trying every matrix up to 4 × 3", () => {
		for (let width = 1; width <= 4; width++) {
			for (let height = 1; height <= 3; height++) {
				for (let side = 1; side <= Math.min(width, height); side++) {
					for (let maxOnes = 0; maxOnes <= side * side; maxOnes++) {
						expect(maximumNumberOfOnes(width, height, side, maxOnes)).toBe(
							byBruteForce(width, height, side, maxOnes),
						);
					}
				}
			}
		}
	});
});
