import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfRemovalQueriesThatCanBeProcessedI as maximumProcessableQueries } from ".";

/** Tries every subsequence and every choice of end. */
const byBruteForce = (nums: number[], queries: number[]): number => {
	const play = (arr: number[], q: number): number => {
		if (q === queries.length || arr.length === 0) return q;
		const query = queries[q] ?? 0;
		let best = q;
		if ((arr[0] ?? 0) >= query)
			best = Math.max(best, play(arr.slice(1), q + 1));
		if ((arr.at(-1) ?? 0) >= query)
			best = Math.max(best, play(arr.slice(0, -1), q + 1));
		return best;
	};
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++)
		best = Math.max(
			best,
			play(
				nums.filter((_, i) => (mask >> i) & 1),
				0,
			),
		);
	return best;
};

describe("3018. Maximum Number of Removal Queries That Can Be Processed I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProcessableQueries([1, 2, 3, 4, 5], [1, 2, 3, 4, 6])).toBe(4);
		expect(maximumProcessableQueries([2, 3, 2], [2, 2, 3])).toBe(3);
		expect(maximumProcessableQueries([3, 4, 3], [4, 3, 2])).toBe(2);
	});

	it("matches trying everything on random inputs", () => {
		const random = createRandom(3018);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 7), 1, 6);
			const queries = random.array(random.int(1, 7), 1, 6);
			expect(maximumProcessableQueries(nums, queries)).toBe(
				byBruteForce(nums, queries),
			);
		}
	});
});
