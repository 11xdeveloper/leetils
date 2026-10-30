/**
 * 2302. Count Subarrays With Score Less Than K
 *
 * A subarray's score is its sum times its length. Counts the non-empty
 * subarrays of the positive `nums` scoring less than `k`.
 *
 * Scores grow as a window widens, so slide one, counting the windows
 * ending at each index.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-score-less-than-k/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubarraysWithScoreLessThanK([2, 1, 4, 3, 5], 10); // 6
 */
export const countSubarraysWithScoreLessThanK = (
	nums: readonly number[],
	k: number,
): number => {
	let [count, sum, start] = [0, 0, 0];
	for (const [end, num] of nums.entries()) {
		sum += num;
		while (start <= end && sum * (end - start + 1) >= k)
			sum -= nums[start++] ?? 0;
		count += end - start + 1;
	}
	return count;
};
