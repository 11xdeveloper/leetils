import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithKDistinctIntegers as countSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number, m: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		const counts = new Map<number, number>();
		for (let j = i; j < nums.length; j++) {
			counts.set(nums[j] ?? 0, (counts.get(nums[j] ?? 0) ?? 0) + 1);
			if (counts.size === k && [...counts.values()].every((c) => c >= m))
				count++;
		}
	}
	return count;
};

describe("3859. Count Subarrays With K Distinct Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 2, 1, 2, 2], 2, 2)).toBe(2);
		expect(countSubarrays([3, 1, 2, 4], 2, 1)).toBe(3);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3859);
		for (let run = 0; run < 400; run++) {
			const nums = random.array(random.int(1, 14), 1, 4);
			const k = random.int(1, 4);
			const m = random.int(1, 3);
			expect(countSubarrays(nums, k, m)).toBe(byBruteForce(nums, k, m));
		}
	});
});
