import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfWaysToPartitionAnArray as waysToPartition } from ".";

const pivots = (nums: number[]): number => {
	const total = nums.reduce((sum, v) => sum + v, 0);
	let [count, prefix] = [0, 0];
	for (let p = 1; p < nums.length; p++) {
		prefix += nums[p - 1] ?? 0;
		if (2 * prefix === total) count++;
	}
	return count;
};

/** Tries changing each element in turn. */
const byBruteForce = (nums: number[], k: number): number =>
	Math.max(pivots(nums), ...nums.map((_, i) => pivots(nums.with(i, k))));

describe("2025. Maximum Number of Ways to Partition an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToPartition([2, -1, 2], 3)).toBe(1);
		expect(waysToPartition([0, 0, 0], 1)).toBe(2);
		expect(
			waysToPartition(
				[22, 4, -25, -20, -15, 15, -16, 7, 19, -10, 0, -13, -14],
				-33,
			),
		).toBe(4);
	});

	it("matches trying every change on random inputs", () => {
		const random = createRandom(2025);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 10), -3, 3);
			const k = random.int(-3, 3);
			expect(waysToPartition(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
