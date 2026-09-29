/**
 * 646. Maximum Length of Pair Chain
 *
 * Pair `[c, d]` can follow `[a, b]` when `b < c`. Returns the length of the
 * longest chain that can be formed from `pairs`, in any order and without
 * using every pair.
 *
 * Greedy, like interval scheduling: sorted by the second number, take each
 * pair that can follow the last one taken. Ending as early as possible
 * leaves the most room for later pairs.
 *
 * @see https://leetcode.com/problems/maximum-length-of-pair-chain/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * maximumLengthOfPairChain([[1, 2], [7, 8], [4, 5]]); // 3
 */
export const maximumLengthOfPairChain = (
	pairs: readonly (readonly number[])[],
): number => {
	let length = 0;
	let end = Number.NEGATIVE_INFINITY;
	for (const [start = 0, finish = 0] of pairs.toSorted(
		(a, b) => (a[1] ?? 0) - (b[1] ?? 0),
	)) {
		if (start > end) {
			length++;
			end = finish;
		}
	}
	return length;
};
