import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { greatestSumDivisibleByThree as maxSumDivThree } from ".";

/** Tries every subset. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 2 ** nums.length; mask++) {
		const sum = nums.reduce(
			(total, num, i) => total + (mask & (1 << i) ? num : 0),
			0,
		);
		if (sum % 3 === 0) best = Math.max(best, sum);
	}
	return best;
};

describe("1262. Greatest Sum Divisible by Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumDivThree([3, 6, 5, 1, 8])).toBe(18);
		expect(maxSumDivThree([4])).toBe(0);
		expect(maxSumDivThree([1, 2, 3, 4, 4])).toBe(12);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1262);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			expect(maxSumDivThree(nums)).toBe(byBruteForce(nums));
		}
	});
});
