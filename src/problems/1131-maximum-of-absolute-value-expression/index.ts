/**
 * 1131. Maximum of Absolute Value Expression
 *
 * Returns the largest `|arr1[i] − arr1[j]| + |arr2[i] − arr2[j]| + |i − j|`
 * over all pairs of indices.
 *
 * The expression is the largest of `f(i) − f(j)` over the four sign
 * choices `f(i) = ±arr1[i] ± arr2[i] + i` (the sign on the index can be
 * fixed, by swapping `i` and `j`). So for each choice it's the largest `f`
 * minus the smallest.
 *
 * @see https://leetcode.com/problems/maximum-of-absolute-value-expression/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumOfAbsoluteValueExpression([1, 2, 3, 4], [-1, 4, 5, 6]); // 13
 */
export const maximumOfAbsoluteValueExpression = (
	arr1: readonly number[],
	arr2: readonly number[],
): number => {
	let best = 0;
	for (const [sign1, sign2] of [
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	] as const) {
		let [low, high] = [Infinity, -Infinity];
		for (let i = 0; i < arr1.length; i++) {
			const value = sign1 * (arr1[i] ?? 0) + sign2 * (arr2[i] ?? 0) + i;
			low = Math.min(low, value);
			high = Math.max(high, value);
		}
		best = Math.max(best, high - low);
	}
	return best;
};
