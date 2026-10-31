/**
 * 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum
 *
 * The longest sequential prefix rises by exactly 1 each step. Returns the
 * smallest number not in `nums` that is at least that prefix's sum.
 *
 * Sum the prefix, then step up past every value present.
 *
 * @see https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestMissingIntegerGreaterThanSequentialPrefixSum([3, 4, 5, 1, 12, 14, 13]); // 15
 */
export const smallestMissingIntegerGreaterThanSequentialPrefixSum = (
	nums: readonly number[],
): number => {
	let sum = nums[0] ?? 0;
	for (let i = 1; i < nums.length && nums[i] === (nums[i - 1] ?? 0) + 1; i++)
		sum += nums[i] ?? 0;
	const present = new Set(nums);
	while (present.has(sum)) sum++;
	return sum;
};
