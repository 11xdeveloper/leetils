/**
 * 2317. Maximum XOR After Operations
 *
 * An operation replaces `nums[i]` with `nums[i] & (nums[i] ^ x)`, which
 * can clear any of its bits. Returns the largest XOR of the array after
 * any operations.
 *
 * Bits can only be cleared, and any bit set somewhere can be kept in
 * exactly one element, so the answer is the OR of everything.
 *
 * @see https://leetcode.com/problems/maximum-xor-after-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumXorAfterOperations([3, 2, 4, 6]); // 7
 */
export const maximumXorAfterOperations = (nums: readonly number[]): number =>
	nums.reduce((or, num) => or | num, 0);
