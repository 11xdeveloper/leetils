import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfGreatPartitions as countPartitions } from ".";

/** Tries every split. */
const byBruteForce = (nums: number[], k: number): number => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	let count = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let sum = 0;
		for (let i = 0; i < nums.length; i++)
			if ((mask >> i) & 1) sum += nums[i] ?? 0;
		if (sum >= k && total - sum >= k) count++;
	}
	return count;
};

describe("2518. Number of Great Partitions", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPartitions([1, 2, 3, 4], 4)).toBe(6);
		expect(countPartitions([3, 3, 3], 4)).toBe(0);
		expect(countPartitions([6, 6], 2)).toBe(2);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(2518);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			const k = random.int(1, 20);
			expect(countPartitions(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
