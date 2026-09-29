import { longestIncreasingSubsequence } from "../0300-longest-increasing-subsequence";

/**
 * 354. Russian Doll Envelopes
 *
 * Returns the most envelopes, each `[width, height]`, that can be nested
 * inside one another, where an envelope fits inside another only if both
 * its width and height are strictly smaller. Envelopes can't be rotated.
 *
 * Sorts by width ascending and, for equal widths, height descending, so
 * envelopes of the same width can never both be picked. The answer is then
 * the longest strictly increasing subsequence of heights, from Longest
 * Increasing Subsequence.
 *
 * @see https://leetcode.com/problems/russian-doll-envelopes/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * russianDollEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3]]); // 3: [2, 3] → [5, 4] → [6, 7]
 */
export const russianDollEnvelopes = (
	envelopes: readonly (readonly number[])[],
): number => {
	const sorted = envelopes.toSorted(
		([w1 = 0, h1 = 0], [w2 = 0, h2 = 0]) => w1 - w2 || h2 - h1,
	);
	return longestIncreasingSubsequence(sorted.map(([, height = 0]) => height));
};
