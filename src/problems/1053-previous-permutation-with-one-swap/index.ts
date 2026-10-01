/**
 * 1053. Previous Permutation With One Swap
 *
 * Returns the lexicographically largest array smaller than `arr` that one
 * swap can produce, or `arr` itself if there's none.
 *
 * The swap must lower the rightmost position that can be lowered: the last
 * `i` with `arr[i] > arr[i + 1]`. It swaps in the largest smaller value to
 * its right, taking its leftmost copy so the rest stays as large as
 * possible.
 *
 * @see https://leetcode.com/problems/previous-permutation-with-one-swap/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the copy
 *
 * @example
 * previousPermutationWithOneSwap([1, 9, 4, 6, 7]); // [1, 7, 4, 6, 9]
 */
export const previousPermutationWithOneSwap = (
	arr: readonly number[],
): number[] => {
	const result = [...arr];
	let i = result.length - 2;
	while (i >= 0 && (result[i] ?? 0) <= (result[i + 1] ?? 0)) i--;
	if (i < 0) return result;

	let j = -1;
	for (let k = i + 1; k < result.length; k++) {
		const value = result[k] ?? 0;
		if (value < (result[i] ?? 0) && (j === -1 || value > (result[j] ?? 0)))
			j = k;
	}
	[result[i], result[j]] = [result[j] ?? 0, result[i] ?? 0];
	return result;
};
