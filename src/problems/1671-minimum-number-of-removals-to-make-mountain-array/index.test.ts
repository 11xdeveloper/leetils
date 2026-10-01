import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfRemovalsToMakeMountainArray as minimumMountainRemovals } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const kept = nums.filter((_, i) => mask & (1 << i));
		for (let peak = 1; peak < kept.length - 1; peak++) {
			const ok = kept.every((value, i) =>
				i === 0
					? true
					: i <= peak
						? value > (kept[i - 1] ?? 0)
						: value < (kept[i - 1] ?? 0),
			);
			if (ok) longest = Math.max(longest, kept.length);
		}
	}
	return nums.length - longest;
};

describe("1671. Minimum Number of Removals to Make Mountain Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumMountainRemovals([1, 3, 1])).toBe(0);
		expect(minimumMountainRemovals([2, 1, 1, 5, 6, 2, 3, 1])).toBe(3);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1671);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(3, 10), 1, 6);
			expect(minimumMountainRemovals(nums)).toBe(byBruteForce(nums));
		}
	});
});
