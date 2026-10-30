/**
 * 2740. Find the Value of the Partition
 *
 * Splits `nums` into two non-empty groups to minimise the largest of the
 * first minus the smallest of the second. Returns that minimum.
 *
 * Once sorted, cutting between any two neighbours achieves their gap, and
 * no split beats the smallest gap.
 *
 * @see https://leetcode.com/problems/find-the-value-of-the-partition/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheValueOfThePartition([100, 1, 10]); // 9
 */
export const findTheValueOfThePartition = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = Number.POSITIVE_INFINITY;
	for (let i = 1; i < sorted.length; i++)
		best = Math.min(best, (sorted[i] ?? 0) - (sorted[i - 1] ?? 0));
	return best;
};
