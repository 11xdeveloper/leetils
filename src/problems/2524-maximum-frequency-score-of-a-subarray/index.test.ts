import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumFrequencyScoreOfASubarray as maxFrequencyScore } from ".";

/** Scores every window with BigInt powers. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0n;
	for (let start = 0; start + k <= nums.length; start++) {
		const frequency = new Map<number, number>();
		for (const num of nums.slice(start, start + k))
			frequency.set(num, (frequency.get(num) ?? 0) + 1);
		let score = 0n;
		for (const [value, count] of frequency)
			score += BigInt(value) ** BigInt(count);
		score %= 1_000_000_007n;
		if (score > best) best = score;
	}
	return Number(best);
};

describe("2524. Maximum Frequency Score of a Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFrequencyScore([1, 1, 1, 2, 1, 2], 3)).toBe(5);
		expect(maxFrequencyScore([1, 1, 1, 1, 1, 1], 4)).toBe(1);
	});

	it("matches scoring every window on random inputs", () => {
		const random = createRandom(2524);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 1_000_000);
			for (let i = 0; i < nums.length; i++)
				if (random.int(0, 1)) nums[i] = nums[random.int(0, i)] ?? 1;
			const k = random.int(1, nums.length);
			expect(maxFrequencyScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
