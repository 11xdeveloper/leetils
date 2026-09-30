/**
 * 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 *
 * Returns the length of the longest subarray of `nums` whose largest and
 * smallest elements differ by at most `limit`.
 *
 * A sliding window with two monotonic deques of indices, one holding
 * candidates for the window's maximum and one for its minimum. When they
 * differ by too much, the window shrinks from the left.
 *
 * @see https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestContinuousSubarrayWithAbsoluteDiffLessThanOrEqualToLimit([10, 1, 2, 4, 7, 2], 5); // 4
 */
export const longestContinuousSubarrayWithAbsoluteDiffLessThanOrEqualToLimit = (
	nums: readonly number[],
	limit: number,
): number => {
	const highs: number[] = [];
	const lows: number[] = [];
	let [highFront, lowFront, start, longest] = [0, 0, 0, 0];
	const at = (i: number | undefined) => nums[i ?? 0] ?? 0;
	nums.forEach((num, end) => {
		while (highs.length > highFront && at(highs.at(-1)) <= num) highs.pop();
		while (lows.length > lowFront && at(lows.at(-1)) >= num) lows.pop();
		highs.push(end);
		lows.push(end);
		while (at(highs[highFront]) - at(lows[lowFront]) > limit) {
			start++;
			if ((highs[highFront] ?? 0) < start) highFront++;
			if ((lows[lowFront] ?? 0) < start) lowFront++;
		}
		longest = Math.max(longest, end - start + 1);
	});
	return longest;
};
