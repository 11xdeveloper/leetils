/**
 * 1658. Minimum Operations to Reduce X to Zero
 *
 * Each operation removes the first or last element of `nums` (all
 * positive) and subtracts it from `x`. Returns the fewest operations
 * reaching exactly 0, or -1.
 *
 * What remains is a subarray summing to `total − x`; keep the longest one,
 * found with a sliding window since the elements are positive.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToReduceXToZero([3, 2, 20, 1, 1, 3], 10); // 5
 */
export const minimumOperationsToReduceXToZero = (
	nums: readonly number[],
	x: number,
): number => {
	const target = nums.reduce((sum, num) => sum + num, 0) - x;
	if (target < 0) return -1;
	let [longest, sum, left] = [-1, 0, 0];
	for (let right = 0; right < nums.length; right++) {
		sum += nums[right] ?? 0;
		while (sum > target) {
			sum -= nums[left] ?? 0;
			left++;
		}
		if (sum === target) longest = Math.max(longest, right - left + 1);
	}
	if (target === 0) longest = Math.max(longest, 0);
	return longest < 0 ? -1 : nums.length - longest;
};
