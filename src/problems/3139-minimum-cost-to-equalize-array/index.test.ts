import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToEqualizeArray as minCostToEqualizeArray } from ".";

/** Searches the cheapest way to fill each target's shortfalls, by memoised recursion. */
const byBruteForce = (nums: number[], cost1: number, cost2: number): number => {
	const max = Math.max(...nums);
	let best = Number.POSITIVE_INFINITY;
	for (let target = max; target <= 3 * max + 2; target++) {
		const memo = new Map<string, number>();
		const solve = (gaps: number[]): number => {
			const key = gaps.toSorted((a, b) => a - b).join();
			const cached = memo.get(key);
			if (cached !== undefined) return cached;
			if (gaps.every((g) => g === 0)) return 0;
			let cheapest = Number.POSITIVE_INFINITY;
			for (let i = 0; i < gaps.length; i++) {
				if ((gaps[i] ?? 0) === 0) continue;
				cheapest = Math.min(
					cheapest,
					cost1 + solve(gaps.map((g, k) => (k === i ? g - 1 : g))),
				);
				for (let j = i + 1; j < gaps.length; j++)
					if ((gaps[j] ?? 0) > 0)
						cheapest = Math.min(
							cheapest,
							cost2 +
								solve(gaps.map((g, k) => (k === i || k === j ? g - 1 : g))),
						);
			}
			memo.set(key, cheapest);
			return cheapest;
		};
		best = Math.min(best, solve(nums.map((v) => target - v)));
	}
	return best;
};

describe("3139. Minimum Cost to Equalize Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCostToEqualizeArray([4, 1], 5, 2)).toBe(15);
		expect(minCostToEqualizeArray([2, 3, 3, 3, 5], 2, 1)).toBe(6);
		expect(minCostToEqualizeArray([3, 5, 3], 1, 3)).toBe(4);
	});

	it("matches searching every operation on small arrays", () => {
		const random = createRandom(3139);
		for (let run = 0; run < 60; run++) {
			const nums = random.array(random.int(1, 4), 1, 4);
			const cost1 = random.int(1, 6);
			const cost2 = random.int(1, 6);
			expect(minCostToEqualizeArray(nums, cost1, cost2)).toBe(
				byBruteForce(nums, cost1, cost2),
			);
		}
	});

	it("reduces huge costs modulo 10^9 + 7", () => {
		const nums = [1, ...new Array<number>(99999).fill(1e6)];
		const result = minCostToEqualizeArray(nums, 1e6, 1);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1_000_000_007);
	});
});
