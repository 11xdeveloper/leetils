import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSegmentSumAfterRemovals as maximumSegmentSum } from ".";

/** Recomputes the best segment after each removal. */
const bySimulation = (nums: number[], queries: number[]): number[] => {
	const removed = new Set<number>();
	return queries.map((q) => {
		removed.add(q);
		let [best, run] = [0, 0];
		for (const [i, num] of nums.entries()) {
			run = removed.has(i) ? 0 : run + num;
			best = Math.max(best, run);
		}
		return best;
	});
};

describe("2382. Maximum Segment Sum After Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSegmentSum([1, 2, 5, 6, 1], [0, 3, 2, 4, 1])).toEqual([
			14, 7, 2, 2, 0,
		]);
		expect(maximumSegmentSum([3, 2, 11, 1], [3, 2, 1, 0])).toEqual([
			16, 5, 3, 0,
		]);
	});

	it("matches recomputing on random removals", () => {
		const random = createRandom(2382);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 9);
			const queries = nums.map((_, i) => i).sort(() => random.next() - 0.5);
			expect(maximumSegmentSum(nums, queries)).toEqual(
				bySimulation(nums, queries),
			);
		}
	});
});
