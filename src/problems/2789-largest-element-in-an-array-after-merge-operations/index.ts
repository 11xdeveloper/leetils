/**
 * 2789. Largest Element in an Array after Merge Operations
 *
 * An operation replaces `nums[i + 1]` with `nums[i] + nums[i + 1]` when
 * `nums[i] <= nums[i + 1]`, removing `nums[i]`. Returns the largest
 * element reachable.
 *
 * Merge from the right: a running total absorbs each element no larger
 * than it, and restarts at any element that's larger.
 *
 * @see https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * largestElementInAnArrayAfterMergeOperations([2, 3, 7, 9, 3]); // 21
 */
export const largestElementInAnArrayAfterMergeOperations = (
	nums: readonly number[],
): number => {
	let total = 0;
	for (let i = nums.length - 1; i >= 0; i--) {
		const num = nums[i] ?? 0;
		total = num <= total ? total + num : num;
	}
	return total;
};
