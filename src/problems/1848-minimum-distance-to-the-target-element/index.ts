/**
 * 1848. Minimum Distance to the Target Element
 *
 * Returns the smallest `|i − start|` over indices where `nums[i]` is
 * `target`.
 *
 * Checks every index.
 *
 * @see https://leetcode.com/problems/minimum-distance-to-the-target-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDistanceToTheTargetElement([1, 2, 3, 4, 5], 5, 3); // 1
 */
export const minimumDistanceToTheTargetElement = (
	nums: readonly number[],
	target: number,
	start: number,
): number => {
	let best = Infinity;
	for (const [i, num] of nums.entries())
		if (num === target) best = Math.min(best, Math.abs(i - start));
	return best;
};
