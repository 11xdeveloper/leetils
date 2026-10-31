import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMinimumCostArrayPermutation as findPermutation } from ".";

/** Tries every permutation in lexicographic order. */
const byBruteForce = (nums: number[]): number[] => {
	const n = nums.length;
	let best: number[] = [];
	let bestScore = Number.POSITIVE_INFINITY;
	const permute = (prefix: number[], used: number): void => {
		if (prefix.length === n) {
			let score = 0;
			for (let i = 0; i < n; i++)
				score += Math.abs(
					(prefix[i] ?? 0) - (nums[prefix[(i + 1) % n] ?? 0] ?? 0),
				);
			if (score < bestScore) {
				best = prefix;
				bestScore = score;
			}
			return;
		}
		for (let v = 0; v < n; v++)
			if (!((used >> v) & 1)) permute([...prefix, v], used | (1 << v));
	};
	permute([], 0);
	return best;
};

describe("3149. Find the Minimum Cost Array Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPermutation([1, 0, 2])).toEqual([0, 1, 2]);
		expect(findPermutation([0, 2, 1])).toEqual([0, 2, 1]);
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(3149);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 7);
			const nums = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			expect(findPermutation(nums)).toEqual(byBruteForce(nums));
		}
	});
});
