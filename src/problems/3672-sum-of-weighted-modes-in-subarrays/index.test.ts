import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfWeightedModesInSubarrays as modeWeight } from ".";

/** Counts each window directly. */
const byBruteForce = (nums: number[], k: number): number => {
	let total = 0;
	for (let i = 0; i + k <= nums.length; i++) {
		const counts = new Map<number, number>();
		for (const x of nums.slice(i, i + k))
			counts.set(x, (counts.get(x) ?? 0) + 1);
		let [best, value] = [0, 0];
		for (const [v, c] of counts)
			if (c > best || (c === best && v < value)) [best, value] = [c, v];
		total += best * value;
	}
	return total;
};

describe("3672. Sum of Weighted Modes in Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(modeWeight([1, 2, 2, 3], 3)).toBe(8);
		expect(modeWeight([1, 2, 1, 2], 2)).toBe(3);
		expect(modeWeight([4, 3, 4, 3], 3)).toBe(14);
	});

	it("matches counting each window on random arrays", () => {
		const random = createRandom(3672);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 5);
			const k = random.int(1, nums.length);
			expect(modeWeight(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
