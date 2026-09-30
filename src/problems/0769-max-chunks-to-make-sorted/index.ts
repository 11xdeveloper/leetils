/**
 * 769. Max Chunks To Make Sorted
 *
 * `arr` is a permutation of 0 to n - 1. Returns the most pieces it can be
 * cut into so that sorting each piece on its own and joining them gives the
 * sorted array.
 *
 * A cut after position `i` works exactly when the first `i + 1` numbers are
 * 0 to `i`, i.e. their maximum is `i`.
 *
 * @see https://leetcode.com/problems/max-chunks-to-make-sorted/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maxChunksToMakeSorted([1, 0, 2, 3, 4]); // 4
 */
export const maxChunksToMakeSorted = (arr: readonly number[]): number => {
	let chunks = 0;
	let max = -1;
	for (const [i, value] of arr.entries()) {
		max = Math.max(max, value);
		if (max === i) chunks++;
	}
	return chunks;
};
