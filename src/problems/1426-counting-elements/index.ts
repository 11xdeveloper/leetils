/**
 * 1426. Counting Elements
 *
 * Counts the elements `x` of `arr` (duplicates separately) for which
 * `x + 1` is also in `arr`.
 *
 * A set of the values answers each check in constant time.
 *
 * @see https://leetcode.com/problems/counting-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countingElements([1, 2, 3]); // 2
 */
export const countingElements = (arr: readonly number[]): number => {
	const values = new Set(arr);
	return arr.filter((x) => values.has(x + 1)).length;
};
