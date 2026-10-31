import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfGoodSubarrays as countGood } from ".";

/** Counts pairs in every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let good = 0;
	for (let i = 0; i < nums.length; i++) {
		const counts = new Map<number, number>();
		let pairs = 0;
		for (let j = i; j < nums.length; j++) {
			const c = counts.get(nums[j] ?? 0) ?? 0;
			pairs += c;
			counts.set(nums[j] ?? 0, c + 1);
			if (pairs >= k) good++;
		}
	}
	return good;
};

describe("2537. Count the Number of Good Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGood([1, 1, 1, 1, 1], 10)).toBe(1);
		expect(countGood([3, 1, 4, 3, 2, 2, 4], 2)).toBe(4);
	});

	it("matches counting every subarray on random inputs", () => {
		const random = createRandom(2537);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			const k = random.int(1, 8);
			expect(countGood(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
