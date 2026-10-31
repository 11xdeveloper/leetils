/**
 * 3745. Maximize Expression of Three Elements
 *
 * The largest a + b - c over three different elements a, b and c.
 *
 * Add the two largest and subtract the smallest.
 *
 * @see https://leetcode.com/problems/maximize-expression-of-three-elements/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeExpressionOfThreeElements([1, 4, 2, 5]); // 8
 */
export const maximizeExpressionOfThreeElements = (
	nums: readonly number[],
): number => {
	const sorted = [...nums].sort((a, b) => a - b);
	return (sorted.at(-1) ?? 0) + (sorted.at(-2) ?? 0) - (sorted[0] ?? 0);
};
