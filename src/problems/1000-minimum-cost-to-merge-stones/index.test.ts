import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMergeStones as mergeStones } from ".";

/** Tries every sequence of merges, with memoisation on the piles left. */
const byBruteForce = (stones: number[], k: number): number => {
	const memo = new Map<string, number>();
	const search = (piles: number[]): number => {
		if (piles.length === 1) return 0;
		if (piles.length < k) return Number.POSITIVE_INFINITY;
		const key = piles.join();
		const known = memo.get(key);
		if (known !== undefined) return known;
		let best = Number.POSITIVE_INFINITY;
		for (let i = 0; i + k <= piles.length; i++) {
			const merged = piles.slice(i, i + k).reduce((a, b) => a + b, 0);
			best = Math.min(
				best,
				merged + search([...piles.slice(0, i), merged, ...piles.slice(i + k)]),
			);
		}
		memo.set(key, best);
		return best;
	};
	const result = search(stones);
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};

describe("1000. Minimum Cost to Merge Stones", () => {
	it("solves the examples from the problem statement", () => {
		expect(mergeStones([3, 2, 4, 1], 2)).toBe(20);
		expect(mergeStones([3, 2, 4, 1], 3)).toBe(-1);
		expect(mergeStones([3, 5, 1, 2, 6], 3)).toBe(25);
	});

	it("matches trying every sequence of merges on random piles", () => {
		const random = createRandom(1000);
		for (let run = 0; run < 300; run++) {
			const stones = random.array(random.int(1, 8), 1, 10);
			const k = random.int(2, 4);
			expect(mergeStones(stones, k)).toBe(byBruteForce(stones, k));
		}
	});
});
