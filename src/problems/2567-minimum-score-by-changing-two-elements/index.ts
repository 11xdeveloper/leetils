/**
 * 2567. Minimum Score by Changing Two Elements
 *
 * An array's score is its smallest gap between two elements plus its
 * largest. Returns the smallest score after changing at most two
 * elements.
 *
 * Changing two elements can always make the smallest gap 0 by copying a
 * kept value, so shrink the largest gap: once sorted, drop the two
 * smallest, the two largest, or one of each.
 *
 * @see https://leetcode.com/problems/minimum-score-by-changing-two-elements/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumScoreByChangingTwoElements([1, 4, 7, 8, 5]); // 3
 */
export const minimumScoreByChangingTwoElements = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	const span = (low: number, high: number): number =>
		(sorted[high] ?? 0) - (sorted[low] ?? 0);
	return Math.min(span(2, n - 1), span(0, n - 3), span(1, n - 2));
};
