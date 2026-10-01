import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumLengthOfPairChain as findLongestChain } from ".";

/** Longest chain by DP over pairs sorted by their first number. */
const byDynamicProgramming = (pairs: number[][]): number => {
	const sorted = pairs.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const longest = sorted.map(() => 1);
	for (let i = 0; i < sorted.length; i++) {
		for (let j = 0; j < i; j++) {
			if ((sorted[j]?.[1] ?? 0) < (sorted[i]?.[0] ?? 0))
				longest[i] = Math.max(longest[i] ?? 1, (longest[j] ?? 1) + 1);
		}
	}
	return Math.max(...longest);
};

describe("646. Maximum Length of Pair Chain", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findLongestChain([
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(2);
		expect(
			findLongestChain([
				[1, 2],
				[7, 8],
				[4, 5],
			]),
		).toBe(3);
	});

	it("matches dynamic programming on random pairs", () => {
		const random = createRandom(646);
		for (let run = 0; run < 1000; run++) {
			const pairs = Array.from({ length: random.int(1, 10) }, () => {
				const start = random.int(-10, 10);
				return [start, start + random.int(1, 5)];
			});
			expect(findLongestChain(pairs)).toBe(byDynamicProgramming(pairs));
		}
	});
});
