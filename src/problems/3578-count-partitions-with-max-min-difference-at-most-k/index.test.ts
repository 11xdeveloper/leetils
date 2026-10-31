import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPartitionsWithMaxMinDifferenceAtMostK as countPartitions } from ".";

/** Tries every last segment. */
const byBruteForce = (nums: number[], k: number): number => {
	const ways = [1];
	for (let i = 1; i <= nums.length; i++) {
		let total = 0;
		for (let j = 0; j < i; j++) {
			const segment = nums.slice(j, i);
			if (Math.max(...segment) - Math.min(...segment) <= k)
				total += ways[j] ?? 0;
		}
		ways.push(total);
	}
	return (ways.at(-1) ?? 0) % 1_000_000_007;
};

describe("3578. Count Partitions With Max-Min Difference at Most K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPartitions([9, 4, 1, 3, 7], 4)).toBe(6);
		expect(countPartitions([3, 3, 4], 0)).toBe(2);
	});

	it("matches trying every last segment on random arrays", () => {
		const random = createRandom(3578);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 12), 0, 10);
			const k = random.int(0, 6);
			expect(countPartitions(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
