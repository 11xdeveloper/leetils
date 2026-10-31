/**
 * 3835. Count Subarrays With Cost Less Than or Equal to K
 *
 * A subarray costs (max - min) times its length. Counts the subarrays
 * costing at most `k`.
 *
 * Extending a subarray never lowers its cost, so the valid starts for
 * each end form a range whose left edge only moves right. Track the
 * window's max and min with monotonic deques.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-cost-less-than-or-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithCostLessThanOrEqualToK([1, 3, 2], 4); // 5
 */
export const countSubarraysWithCostLessThanOrEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	const highs: number[] = [];
	const lows: number[] = [];
	let [highHead, lowHead, left, count] = [0, 0, 0, 0];
	nums.forEach((value, right) => {
		while (highs.length > highHead && (nums[highs.at(-1) ?? 0] ?? 0) <= value)
			highs.pop();
		highs.push(right);
		while (lows.length > lowHead && (nums[lows.at(-1) ?? 0] ?? 0) >= value)
			lows.pop();
		lows.push(right);
		const cost = () =>
			((nums[highs[highHead] ?? 0] ?? 0) - (nums[lows[lowHead] ?? 0] ?? 0)) *
			(right - left + 1);
		while (cost() > k) {
			left++;
			if ((highs[highHead] ?? 0) < left) highHead++;
			if ((lows[lowHead] ?? 0) < left) lowHead++;
		}
		count += right - left + 1;
	});
	return count;
};
