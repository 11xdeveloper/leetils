/**
 * 3759. Count Elements With at Least K Greater Values
 *
 * Counts the elements of `nums` with at least `k` elements strictly
 * greater than them.
 *
 * Sorted, an element qualifies when the k-th largest value is above it.
 *
 * @see https://leetcode.com/problems/count-elements-with-at-least-k-greater-values/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countElementsWithAtLeastKGreaterValues([3, 1, 2], 1); // 2
 */
export const countElementsWithAtLeastKGreaterValues = (
	nums: readonly number[],
	k: number,
): number => {
	if (k === 0) return nums.length;
	const sorted = [...nums].sort((a, b) => b - a);
	const threshold = sorted[k - 1] ?? Number.NEGATIVE_INFINITY;
	return nums.filter((num) => num < threshold).length;
};
