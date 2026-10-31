import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestUniqueSubarray } from ".";

/** Counts every subarray's contents. */
const byBruteForce = (nums: number[]): number => {
	for (let length = 1; ; length++) {
		const counts = new Map<string, number>();
		for (let i = 0; i + length <= nums.length; i++) {
			const key = nums.slice(i, i + length).join();
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}
		if ([...counts.values()].includes(1)) return length;
	}
};

describe("3934. Smallest Unique Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestUniqueSubarray([3, 3, 3])).toBe(3);
		expect(smallestUniqueSubarray([2, 1, 2, 3, 3])).toBe(1);
		expect(smallestUniqueSubarray([1, 1, 2, 2, 1])).toBe(2);
	});

	it("matches counting subarrays on random arrays", () => {
		const random = createRandom(3934);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 2);
			expect(smallestUniqueSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
