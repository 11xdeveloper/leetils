import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromicSubarraySum as getSum } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			if (part.every((x, k) => x === part[part.length - 1 - k]))
				best = Math.max(
					best,
					part.reduce((a, b) => a + b, 0),
				);
		}
	return best;
};

describe("3985. Palindromic Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSum([10, 10])).toBe(20);
		expect(getSum([1, 2, 3, 2, 1, 5, 6])).toBe(9);
		expect(getSum([7, 1, 2, 1, 7, 3, 4, 3, 4])).toBe(18);
		expect(getSum([1, 2, 3, 4, 5])).toBe(5);
		expect(getSum([1000])).toBe(1000);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3985);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 3);
			expect(getSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
