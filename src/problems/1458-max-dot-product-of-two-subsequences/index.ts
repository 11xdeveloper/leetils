/**
 * 1458. Max Dot Product of Two Subsequences
 *
 * Returns the largest dot product of two non-empty subsequences of equal
 * length, one from each array.
 *
 * Dynamic programming over prefixes: `best[i][j]` is the answer for the
 * first `i` and `j` elements. Either skip one of the last elements, or pair
 * them, adding the best of the earlier prefixes if that helps. Keeping one
 * row suffices.
 *
 * @see https://leetcode.com/problems/max-dot-product-of-two-subsequences/
 * @difficulty Hard
 * @timeComplexity O(mn)
 * @spaceComplexity O(n)
 *
 * @example
 * maxDotProductOfTwoSubsequences([2, 1, -2, 5], [3, 0, -6]); // 18
 */
export const maxDotProductOfTwoSubsequences = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums2.length;
	let previous = new Array<number>(n + 1).fill(-Infinity);
	for (const a of nums1) {
		const current = new Array<number>(n + 1).fill(-Infinity);
		for (let j = 1; j <= n; j++) {
			const pair = a * (nums2[j - 1] ?? 0);
			current[j] = Math.max(
				previous[j] ?? -Infinity,
				current[j - 1] ?? -Infinity,
				pair + Math.max(0, previous[j - 1] ?? -Infinity),
			);
		}
		previous = current;
	}
	return previous[n] ?? 0;
};
