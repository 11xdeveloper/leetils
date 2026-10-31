/**
 * 3979. Maximum Valid Pair Sum
 *
 * The largest `nums[i] + nums[j]` with j - i at least `k`.
 *
 * Sweep j, keeping the largest element at least k behind it.
 *
 * @see https://leetcode.com/problems/maximum-valid-pair-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumValidPairSum([1, 3, 5, 2, 8], 2); // 13
 */
export const maximumValidPairSum = (
	nums: readonly number[],
	k: number,
): number => {
	let [behind, best] = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
	for (let j = k; j < nums.length; j++) {
		behind = Math.max(behind, nums[j - k] ?? 0);
		best = Math.max(best, behind + (nums[j] ?? 0));
	}
	return best;
};
