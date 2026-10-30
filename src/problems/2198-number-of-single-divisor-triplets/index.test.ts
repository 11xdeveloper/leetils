import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSingleDivisorTriplets as singleDivisorTriplet } from ".";

/** Checks every ordered triplet of distinct indices. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (const [i, a] of nums.entries())
		for (const [j, b] of nums.entries())
			for (const [k, c] of nums.entries()) {
				if (i === j || j === k || i === k) continue;
				const sum = a + b + c;
				if ([a, b, c].filter((v) => sum % v === 0).length === 1) count++;
			}
	return count;
};

describe("2198. Number of Single Divisor Triplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(singleDivisorTriplet([4, 6, 7, 3, 2])).toBe(12);
		expect(singleDivisorTriplet([1, 2, 2])).toBe(6);
		expect(singleDivisorTriplet([1, 1, 1])).toBe(0);
	});

	it("matches checking every triplet on random inputs", () => {
		const random = createRandom(2198);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(3, 8), 1, 8);
			expect(singleDivisorTriplet(nums)).toBe(byBruteForce(nums));
		}
	});
});
