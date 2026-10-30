/**
 * 2256. Minimum Average Difference
 *
 * The average difference at `i` is the gap between the rounded-down
 * averages of the first `i + 1` elements and of the rest (0 if empty).
 * Returns the index with the smallest, earliest on ties.
 *
 * Track the prefix sum against the total.
 *
 * @see https://leetcode.com/problems/minimum-average-difference/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAverageDifference([2, 5, 3, 9, 5, 3]); // 3
 */
export const minimumAverageDifference = (nums: readonly number[]): number => {
	const n = nums.length;
	const total = nums.reduce((sum, v) => sum + v, 0);
	let [prefix, best, index] = [0, Infinity, 0];
	for (const [i, num] of nums.entries()) {
		prefix += num;
		const rest = n - i - 1;
		const difference = Math.abs(
			Math.floor(prefix / (i + 1)) -
				(rest ? Math.floor((total - prefix) / rest) : 0),
		);
		if (difference < best) [best, index] = [difference, i];
	}
	return index;
};
