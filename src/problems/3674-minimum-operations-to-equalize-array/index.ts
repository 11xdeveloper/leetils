/**
 * 3674. Minimum Operations to Equalize Array
 *
 * One operation replaces every element of a subarray with the subarray's
 * AND. Returns the fewest operations making all elements equal.
 *
 * One operation on the whole array always suffices, so it's 0 if they're
 * already equal and 1 otherwise.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-equalize-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToEqualizeArray([1, 2]); // 1
 */
export const minimumOperationsToEqualizeArray = (
	nums: readonly number[],
): number => (nums.every((num) => num === nums[0]) ? 0 : 1);
