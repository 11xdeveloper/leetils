/**
 * 3301. Maximize the Total Height of Unique Towers
 *
 * Give each tower a distinct positive height no taller than its maximum.
 * Returns the largest total height, or -1 if that's impossible.
 *
 * Going from the tallest allowance down, give each tower its allowance or
 * one less than the previous tower, whichever is lower.
 *
 * @see https://leetcode.com/problems/maximize-the-total-height-of-unique-towers/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeTheTotalHeightOfUniqueTowers([2, 3, 4, 3]); // 10
 */
export const maximizeTheTotalHeightOfUniqueTowers = (
	maximumHeight: readonly number[],
): number => {
	let total = 0;
	let previous = Number.POSITIVE_INFINITY;
	for (const allowance of maximumHeight.toSorted((a, b) => b - a)) {
		const height = Math.min(allowance, previous - 1);
		if (height <= 0) return -1;
		total += height;
		previous = height;
	}
	return total;
};
