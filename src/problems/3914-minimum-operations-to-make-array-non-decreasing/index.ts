/**
 * 3914. Minimum Operations to Make Array Non Decreasing
 *
 * One operation adds some positive x to a subarray, costing x. Returns
 * the least total cost making `nums` non-decreasing.
 *
 * Adding x to a suffix raises one neighbour difference by x and lowers
 * none, so each drop between neighbours needs exactly its size.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-non-decreasing/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArrayNonDecreasing([5, 1, 2, 3]); // 4
 */
export const minimumOperationsToMakeArrayNonDecreasing = (
	nums: readonly number[],
): number => {
	let total = 0;
	for (let i = 1; i < nums.length; i++)
		total += Math.max(0, (nums[i - 1] ?? 0) - (nums[i] ?? 0));
	return total;
};
