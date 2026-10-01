/**
 * 1608. Special Array With X Elements Greater Than or Equal X
 *
 * Returns the `x` for which exactly `x` elements of `nums` are at least
 * `x`, or -1 if there's none.
 *
 * Sorted in descending order, `x` works when the `x`th largest is at least
 * `x` and the next one is smaller.
 *
 * @see https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * specialArrayWithXElementsGreaterThanOrEqualX([0, 4, 3, 0, 4]); // 3
 */
export const specialArrayWithXElementsGreaterThanOrEqualX = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => b - a);
	for (let x = 1; x <= sorted.length; x++) {
		if ((sorted[x - 1] ?? 0) >= x && (sorted[x] ?? -1) < x) return x;
	}
	return -1;
};
