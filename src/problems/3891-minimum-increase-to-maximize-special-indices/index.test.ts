import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIncreaseToMaximizeSpecialIndices as minIncrease } from ".";

/** Tries every set of special indices. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	let [bestCount, bestCost] = [-1, 0];
	for (let mask = 0; mask < 1 << n; mask++) {
		if (mask & 1 || (mask >> (n - 1)) & 1 || mask & (mask >> 1)) continue;
		let [count, cost] = [0, 0];
		for (let i = 1; i < n - 1; i++)
			if ((mask >> i) & 1) {
				count++;
				cost += Math.max(
					0,
					Math.max(nums[i - 1] ?? 0, nums[i + 1] ?? 0) + 1 - (nums[i] ?? 0),
				);
			}
		if (count > bestCount || (count === bestCount && cost < bestCost))
			[bestCount, bestCost] = [count, cost];
	}
	return bestCost;
};

describe("3891. Minimum Increase to Maximize Special Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(minIncrease([1, 2, 2])).toBe(1);
		expect(minIncrease([2, 1, 1, 3])).toBe(2);
		expect(minIncrease([5, 2, 1, 4, 3])).toBe(4);
	});

	it("matches trying every set on random arrays", () => {
		const random = createRandom(3891);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 10), 1, 8);
			expect(minIncrease(nums)).toBe(byBruteForce(nums));
		}
	});
});
