import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeOrOfRemainingElementsUsingOperations as minOrAfterOperations } from ".";

/** Tries every split into contiguous groups with few enough merges. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let cuts = 0; cuts < 1 << (n - 1); cuts++) {
		let groups = 1;
		let or = 0;
		let and = nums[0] ?? 0;
		for (let i = 1; i < n; i++)
			if ((cuts >> (i - 1)) & 1) {
				or |= and;
				and = nums[i] ?? 0;
				groups++;
			} else and &= nums[i] ?? 0;
		or |= and;
		if (n - groups <= k) best = Math.min(best, or);
	}
	return best;
};

describe("3022. Minimize OR of Remaining Elements Using Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOrAfterOperations([3, 5, 3, 2, 7], 2)).toBe(3);
		expect(minOrAfterOperations([7, 3, 15, 14, 2, 8], 4)).toBe(2);
		expect(minOrAfterOperations([10, 7, 10, 3, 9, 14, 9, 4], 1)).toBe(15);
	});

	it("matches trying every grouping on random arrays", () => {
		const random = createRandom(3022);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), 0, 31);
			const k = random.int(0, nums.length - 1);
			expect(minOrAfterOperations(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
