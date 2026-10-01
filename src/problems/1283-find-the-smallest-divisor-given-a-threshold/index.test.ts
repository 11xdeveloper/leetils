import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheSmallestDivisorGivenAThreshold as smallestDivisor } from ".";

/** Tries divisors upwards. */
const byBruteForce = (nums: number[], threshold: number): number => {
	for (let divisor = 1; ; divisor++) {
		if (
			nums.reduce((sum, num) => sum + Math.ceil(num / divisor), 0) <= threshold
		)
			return divisor;
	}
};

describe("1283. Find the Smallest Divisor Given a Threshold", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestDivisor([1, 2, 5, 9], 6)).toBe(5);
		expect(smallestDivisor([44, 22, 33, 11, 1], 5)).toBe(44);
	});

	it("matches trying divisors upwards on random inputs", () => {
		const random = createRandom(1283);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 50);
			const threshold = random.int(nums.length, 100);
			expect(smallestDivisor(nums, threshold)).toBe(
				byBruteForce(nums, threshold),
			);
		}
	});
});
