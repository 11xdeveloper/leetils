/**
 * 2461. Maximum Sum of Distinct Subarrays With Length K
 *
 * Returns the largest sum of a length-`k` subarray with distinct elements,
 * or 0.
 *
 * Slide the window, counting values and how many repeat.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * maximumSumOfDistinctSubarraysWithLengthK([1, 5, 4, 2, 9, 9, 9], 3); // 15
 */
export const maximumSumOfDistinctSubarraysWithLengthK = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	let [sum, best] = [0, 0];
	for (const [i, num] of nums.entries()) {
		sum += num;
		counts.set(num, (counts.get(num) ?? 0) + 1);
		const leaving = nums[i - k];
		if (leaving !== undefined) {
			sum -= leaving;
			const left = (counts.get(leaving) ?? 0) - 1;
			if (left) counts.set(leaving, left);
			else counts.delete(leaving);
		}
		if (i >= k - 1 && counts.size === k) best = Math.max(best, sum);
	}
	return best;
};
