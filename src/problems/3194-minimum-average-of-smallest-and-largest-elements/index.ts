/**
 * 3194. Minimum Average of Smallest and Largest Elements
 *
 * Repeatedly remove the smallest and largest elements of `nums` and record
 * their average. Returns the smallest average recorded.
 *
 * Sort, then pair the i-th smallest with the i-th largest.
 *
 * @see https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAverageOfSmallestAndLargestElements([7, 8, 3, 4, 15, 13, 4, 1]); // 5.5
 */
export const minimumAverageOfSmallestAndLargestElements = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0, j = sorted.length - 1; i < j; i++, j--)
		best = Math.min(best, ((sorted[i] ?? 0) + (sorted[j] ?? 0)) / 2);
	return best;
};
