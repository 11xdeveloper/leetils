import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestNegatedPermutationThatSumsToTarget as lexSmallestNegatedPerm } from ".";

/** Tries every set of signs and sorts the best. */
const byBruteForce = (n: number, target: number): number[] => {
	let best: number[] | undefined;
	for (let mask = 0; mask < 1 << n; mask++) {
		const arr = Array.from({ length: n }, (_, i) =>
			(mask >> i) & 1 ? -(i + 1) : i + 1,
		).sort((a, b) => a - b);
		if (arr.reduce((a, b) => a + b, 0) !== target) continue;
		const first = best ? arr.findIndex((x, i) => x !== best?.[i]) : 0;
		if (!best || (first >= 0 && (arr[first] ?? 0) < (best[first] ?? 0)))
			best = arr;
	}
	return best ?? [];
};

describe("3752. Lexicographically Smallest Negated Permutation that Sums to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexSmallestNegatedPerm(3, 0)).toEqual([-3, 1, 2]);
		expect(lexSmallestNegatedPerm(1, 10000000000)).toEqual([]);
	});

	it("matches trying every set of signs", () => {
		for (let n = 1; n <= 8; n++)
			for (let target = -40; target <= 40; target++)
				expect(lexSmallestNegatedPerm(n, target)).toEqual(
					byBruteForce(n, target),
				);
	});
});
