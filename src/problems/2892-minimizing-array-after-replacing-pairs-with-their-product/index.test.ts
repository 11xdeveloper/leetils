import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizingArrayAfterReplacingPairsWithTheirProduct as minArrayLength } from ".";

/** Tries every sequence of merges. */
const byBruteForce = (nums: number[], k: number): number => {
	const seen = new Set<string>();
	let best = nums.length;
	const explore = (arr: number[]): void => {
		const key = arr.join(",");
		if (seen.has(key)) return;
		seen.add(key);
		best = Math.min(best, arr.length);
		for (let i = 0; i + 1 < arr.length; i++) {
			const product = (arr[i] ?? 0) * (arr[i + 1] ?? 0);
			if (product <= k)
				explore([...arr.slice(0, i), product, ...arr.slice(i + 2)]);
		}
	};
	explore(nums);
	return best;
};

describe("2892. Minimizing Array After Replacing Pairs With Their Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(minArrayLength([2, 3, 3, 7, 3, 5], 20)).toBe(3);
		expect(minArrayLength([3, 3, 3, 3], 6)).toBe(4);
	});

	it("matches trying every merge on random inputs", () => {
		const random = createRandom(2892);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), 0, 6);
			const k = random.int(1, 30);
			expect(minArrayLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
