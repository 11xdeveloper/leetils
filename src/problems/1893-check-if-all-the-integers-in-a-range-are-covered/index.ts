/**
 * 1893. Check if All the Integers in a Range Are Covered
 *
 * Returns whether every integer in `[left, right]` lies in some interval
 * of `ranges`.
 *
 * Checks each integer against the ranges (all values are at most 50).
 *
 * @see https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/
 * @difficulty Easy
 * @timeComplexity O((right − left) · n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfAllTheIntegersInARangeAreCovered([[1, 2], [3, 4], [5, 6]], 2, 5); // true
 */
export const checkIfAllTheIntegersInARangeAreCovered = (
	ranges: readonly (readonly number[])[],
	left: number,
	right: number,
): boolean => {
	for (let x = left; x <= right; x++) {
		if (!ranges.some(([start = 0, end = 0]) => start <= x && x <= end))
			return false;
	}
	return true;
};
