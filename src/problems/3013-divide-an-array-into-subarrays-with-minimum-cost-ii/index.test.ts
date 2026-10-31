import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { divideAnArrayIntoSubarraysWithMinimumCostII as minimumCost } from ".";

/** Tries every set of start positions. */
const byBruteForce = (nums: number[], k: number, dist: number): number => {
	let best = Number.POSITIVE_INFINITY;
	const choose = (
		from: number,
		left: number,
		first: number,
		sum: number,
	): void => {
		if (left === 0) {
			best = Math.min(best, sum);
			return;
		}
		for (let i = from; i < nums.length; i++) {
			if (first !== -1 && i - first > dist) break;
			choose(i + 1, left - 1, first === -1 ? i : first, sum + (nums[i] ?? 0));
		}
	};
	choose(1, k - 1, -1, nums[0] ?? 0);
	return best;
};

describe("3013. Divide an Array Into Subarrays With Minimum Cost II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([1, 3, 2, 6, 4, 2], 3, 3)).toBe(5);
		expect(minimumCost([10, 1, 2, 2, 2, 1], 4, 3)).toBe(15);
		expect(minimumCost([10, 8, 18, 9], 3, 1)).toBe(36);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3013);
		for (let run = 0; run < 300; run++) {
			const n = random.int(3, 10);
			const nums = random.array(n, 1, 9);
			const k = random.int(3, n);
			const dist = random.int(k - 2, n - 2);
			expect(minimumCost(nums, k, dist)).toBe(byBruteForce(nums, k, dist));
		}
	});
});
