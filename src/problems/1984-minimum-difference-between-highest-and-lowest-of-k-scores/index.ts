/**
 * 1984. Minimum Difference Between Highest and Lowest of K Scores
 *
 * Choosing `k` scores, returns the smallest possible difference between
 * the highest and lowest chosen.
 *
 * The best choice is `k` consecutive sorted scores.
 *
 * @see https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDifferenceBetweenHighestAndLowestOfKScores([9, 4, 1, 7], 2); // 2
 */
export const minimumDifferenceBetweenHighestAndLowestOfKScores = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = Infinity;
	for (let i = 0; i + k <= sorted.length; i++)
		best = Math.min(best, (sorted[i + k - 1] ?? 0) - (sorted[i] ?? 0));
	return best;
};
