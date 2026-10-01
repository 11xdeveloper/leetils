import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { leastNumberOfUniqueIntegersAfterKRemovals as findLeastNumOfUniqueInts } from ".";

/** Tries removing every set of exactly k positions. */
const byBruteForce = (arr: number[], k: number): number => {
	let best = Infinity;
	for (let mask = 0; mask < 2 ** arr.length; mask++) {
		const kept = arr.filter((_, i) => !(mask & (1 << i)));
		if (arr.length - kept.length === k)
			best = Math.min(best, new Set(kept).size);
	}
	return best;
};

describe("1481. Least Number of Unique Integers after K Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLeastNumOfUniqueInts([5, 5, 4], 1)).toBe(1);
		expect(findLeastNumOfUniqueInts([4, 3, 1, 1, 3, 3, 2], 3)).toBe(2);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1481);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 10), 1, 4);
			const k = random.int(0, arr.length);
			expect(findLeastNumOfUniqueInts(arr, k)).toBe(byBruteForce(arr, k));
		}
	});
});
