/**
 * 3468. Find the Number of Copy Arrays
 *
 * Count the arrays with the same differences between neighbours as
 * `original` whose i-th element lies within `bounds[i]`.
 *
 * Such an array is `original` shifted by a constant, so intersect the
 * allowed shifts from every position.
 *
 * @see https://leetcode.com/problems/find-the-number-of-copy-arrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheNumberOfCopyArrays([1, 2, 3, 4], [[1, 2], [2, 3], [3, 4], [4, 5]]); // 2
 */
export const findTheNumberOfCopyArrays = (
	original: readonly number[],
	bounds: readonly (readonly number[])[],
): number => {
	let lo = Number.NEGATIVE_INFINITY;
	let hi = Number.POSITIVE_INFINITY;
	original.forEach((value, i) => {
		lo = Math.max(lo, (bounds[i]?.[0] ?? 0) - value);
		hi = Math.min(hi, (bounds[i]?.[1] ?? 0) - value);
	});
	return Math.max(0, hi - lo + 1);
};
