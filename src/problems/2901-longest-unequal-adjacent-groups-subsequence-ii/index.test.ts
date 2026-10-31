import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestUnequalAdjacentGroupsSubsequenceII as getWordsInLongestSubsequence } from ".";

const oneApart = (a: string, b: string): boolean =>
	a.length === b.length &&
	[...a].filter((c, i) => c !== b.charAt(i)).length === 1;

/** Checks the result is a valid subsequence and as long as the best found by brute force. */
const longestValid = (words: string[], groups: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << words.length; mask++) {
		const picked = words.map((_, i) => i).filter((i) => (mask >> i) & 1);
		const ok = picked.every(
			(i, k) =>
				k === 0 ||
				(groups[i] !== groups[picked[k - 1] ?? 0] &&
					oneApart(words[i] ?? "", words[picked[k - 1] ?? 0] ?? "")),
		);
		if (ok) best = Math.max(best, picked.length);
	}
	return best;
};

describe("2901. Longest Unequal Adjacent Groups Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect([
			["bab", "cab"],
			["bab", "dab"],
		]).toContainEqual(
			getWordsInLongestSubsequence(["bab", "dab", "cab"], [1, 2, 2]),
		);
		expect(
			getWordsInLongestSubsequence(["a", "b", "c", "d"], [1, 2, 3, 4]),
		).toEqual(["a", "b", "c", "d"]);
	});

	it("finds a longest valid subsequence on random inputs", () => {
		const random = createRandom(2901);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const words = [
				...new Set(
					Array.from({ length: n }, () =>
						random.string(random.int(1, 2), "ab"),
					),
				),
			];
			const groups = random.array(words.length, 1, 3);
			const result = getWordsInLongestSubsequence(words, groups);
			expect(result.length).toBe(longestValid(words, groups));
			const indices = result.map((w) => words.indexOf(w));
			for (let k = 1; k < indices.length; k++) {
				expect(indices[k] ?? 0).toBeGreaterThan(indices[k - 1] ?? 0);
				expect(groups[indices[k] ?? 0]).not.toBe(groups[indices[k - 1] ?? 0]);
				expect(oneApart(result[k] ?? "", result[k - 1] ?? "")).toBe(true);
			}
		}
	});
});
