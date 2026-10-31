/**
 * 3698. Split Array With Minimum Difference
 *
 * Split `nums` into a non-empty strictly increasing prefix and a
 * non-empty strictly decreasing suffix. Returns the smallest absolute
 * difference of their sums, or -1 if no split works.
 *
 * @see https://leetcode.com/problems/split-array-with-minimum-difference/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * splitArrayWithMinimumDifference([1, 3, 2]); // 2
 */
export const splitArrayWithMinimumDifference = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	// decreasingFrom[i]: nums[i..] strictly decreases.
	const decreasingFrom = new Uint8Array(n + 1);
	decreasingFrom[n - 1] = 1;
	for (let i = n - 2; i >= 0; i--)
		decreasingFrom[i] =
			decreasingFrom[i + 1] && (nums[i] ?? 0) > (nums[i + 1] ?? 0) ? 1 : 0;
	const total = nums.reduce((a, b) => a + b, 0);
	let best = -1;
	let prefix = 0;
	for (let i = 0; i + 1 < n; i++) {
		if (i > 0 && (nums[i] ?? 0) <= (nums[i - 1] ?? 0)) break;
		prefix += nums[i] ?? 0;
		if (!decreasingFrom[i + 1]) continue;
		const gap = Math.abs(2 * prefix - total);
		if (best < 0 || gap < best) best = gap;
	}
	return best;
};
