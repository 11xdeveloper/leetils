/**
 * 2154. Keep Multiplying Found Values by Two
 *
 * While `original` is in `nums`, doubles it. Returns the final value.
 *
 * Look values up in a set.
 *
 * @see https://leetcode.com/problems/keep-multiplying-found-values-by-two/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * keepMultiplyingFoundValuesByTwo([5, 3, 6, 1, 12], 3); // 24
 */
export const keepMultiplyingFoundValuesByTwo = (
	nums: readonly number[],
	original: number,
): number => {
	const values = new Set(nums);
	while (values.has(original)) original *= 2;
	return original;
};
