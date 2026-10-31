import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findXSumOfAllKLongSubarraysII as findXSum } from ".";

/** Recounts every window. */
const byBruteForce = (nums: number[], k: number, x: number): number[] => {
	const result: number[] = [];
	for (let start = 0; start + k <= nums.length; start++) {
		const counts = new Map<number, number>();
		for (const v of nums.slice(start, start + k))
			counts.set(v, (counts.get(v) ?? 0) + 1);
		const top = [...counts]
			.sort((a, b) => b[1] - a[1] || b[0] - a[0])
			.slice(0, x);
		result.push(top.reduce((s, [v, c]) => s + v * c, 0));
	}
	return result;
};

describe("3321. Find X-Sum of All K-Long Subarrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findXSum([1, 1, 2, 2, 3, 4, 2, 3], 6, 2)).toEqual([6, 10, 12]);
		expect(findXSum([3, 8, 7, 8, 7, 5], 2, 2)).toEqual([11, 15, 15, 15, 12]);
	});

	it("matches recounting every window on random arrays", () => {
		const random = createRandom(3321);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 14), 1, 5);
			const k = random.int(1, nums.length);
			const x = random.int(1, k);
			expect(findXSum(nums, k, x)).toEqual(byBruteForce(nums, k, x));
		}
	});
});
