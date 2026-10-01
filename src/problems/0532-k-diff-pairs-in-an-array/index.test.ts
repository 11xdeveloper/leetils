import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kDiffPairsInAnArray as findPairs } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	const pairs = new Set<string>();
	for (const [i, a] of nums.entries()) {
		for (const [j, b] of nums.entries())
			if (i !== j && b - a === k) pairs.add(`${a},${b}`);
	}
	return pairs.size;
};

describe("532. K-diff Pairs in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPairs([3, 1, 4, 1, 5], 2)).toBe(2);
		expect(findPairs([1, 2, 3, 4, 5], 1)).toBe(4);
		expect(findPairs([1, 3, 1, 5, 4], 0)).toBe(1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(532);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -5, 5);
			const k = random.int(0, 4);
			expect(findPairs(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
