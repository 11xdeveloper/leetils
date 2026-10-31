/**
 * 3738. Longest Non-Decreasing Subarray After Replacing at Most One Element
 *
 * Replace at most one element of `nums` with any value. Returns the
 * longest non-decreasing subarray possible.
 *
 * With the runs ending and starting at each index, replacing element i
 * joins the run before it to the run after it when the neighbours allow,
 * and otherwise extends either one by one.
 *
 * @see https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestNonDecreasingSubarrayAfterReplacingAtMostOneElement([1, 2, 3, 1, 2]); // 4
 */
export const longestNonDecreasingSubarrayAfterReplacingAtMostOneElement = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const ending = new Array<number>(n).fill(1);
	const starting = new Array<number>(n).fill(1);
	for (let i = 1; i < n; i++)
		if ((nums[i - 1] ?? 0) <= (nums[i] ?? 0))
			ending[i] = (ending[i - 1] ?? 0) + 1;
	for (let i = n - 2; i >= 0; i--)
		if ((nums[i] ?? 0) <= (nums[i + 1] ?? 0))
			starting[i] = (starting[i + 1] ?? 0) + 1;
	let best = 1;
	for (let i = 0; i < n; i++) {
		const before = i > 0 ? (ending[i - 1] ?? 0) : 0;
		const after = i + 1 < n ? (starting[i + 1] ?? 0) : 0;
		best = Math.max(best, before + 1, after + 1);
		if (i > 0 && i + 1 < n && (nums[i - 1] ?? 0) <= (nums[i + 1] ?? 0))
			best = Math.max(best, before + 1 + after);
	}
	return best;
};
