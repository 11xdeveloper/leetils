import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionToKEqualSumSubsets as canPartitionKSubsets } from ".";

/** Tries every assignment of numbers to groups. */
const byBruteForce = (nums: number[], k: number): boolean => {
	for (let code = 0; code < k ** nums.length; code++) {
		const sums = new Array<number>(k).fill(0);
		let rest = code;
		for (const num of nums) {
			sums[rest % k] = (sums[rest % k] ?? 0) + num;
			rest = Math.floor(rest / k);
		}
		if (sums.every((sum) => sum === sums[0]) && sums.every((sum) => sum > 0))
			return true;
	}
	return false;
};

describe("698. Partition to K Equal Sum Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4)).toBeTrue();
		expect(canPartitionKSubsets([1, 2, 3, 4], 3)).toBeFalse();
	});

	it("handles sixteen numbers quickly", () => {
		// 10 + 6, 9 + 7, 8 + 5 + 3 and 4 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1.
		expect(
			canPartitionKSubsets(
				[2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1],
				4,
			),
		).toBeTrue();
		// Each group needs 13, but groups of 3s only reach multiples of 3.
		expect(canPartitionKSubsets([...new Array(15).fill(3), 7], 4)).toBeFalse();
		expect(canPartitionKSubsets(new Array(16).fill(5), 8)).toBeTrue();
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(698);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 7), 1, 5);
			const k = random.int(1, Math.min(4, nums.length));
			expect(canPartitionKSubsets(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
