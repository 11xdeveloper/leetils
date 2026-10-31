import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToDivideArrayIntoSubarrays as minimumCost } from ".";

/** Tries every split, pricing it directly. */
const byBruteForce = (nums: number[], cost: number[], k: number): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let cuts = 0; cuts < 1 << (n - 1); cuts++) {
		let total = 0;
		let start = 0;
		let index = 1;
		for (let r = 0; r < n; r++) {
			if (r === n - 1 || (cuts >> r) & 1) {
				const prefix = nums.slice(0, r + 1).reduce((a, b) => a + b, 0);
				const pieceCost = cost.slice(start, r + 1).reduce((a, b) => a + b, 0);
				total += (prefix + k * index) * pieceCost;
				start = r + 1;
				index++;
			}
		}
		best = Math.min(best, total);
	}
	return best;
};

describe("3500. Minimum Cost to Divide Array Into Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([3, 1, 4], [4, 6, 6], 1)).toBe(110);
		expect(
			minimumCost(
				[4, 8, 5, 1, 14, 2, 2, 12, 1],
				[7, 2, 8, 4, 2, 2, 1, 1, 2],
				7,
			),
		).toBe(985);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3500);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const nums = random.array(n, 1, 6);
			const cost = random.array(n, 1, 6);
			const k = random.int(1, 5);
			expect(minimumCost(nums, cost, k)).toBe(byBruteForce(nums, cost, k));
		}
	});
});
