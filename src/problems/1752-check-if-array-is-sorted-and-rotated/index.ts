/**
 * 1752. Check if Array Is Sorted and Rotated
 *
 * Returns whether `nums` is a rotation of a non-decreasing array.
 *
 * Going around the array circularly, a rotated sorted array decreases at
 * most once.
 *
 * @see https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfArrayIsSortedAndRotated([3, 4, 5, 1, 2]); // true
 */
export const checkIfArrayIsSortedAndRotated = (
	nums: readonly number[],
): boolean => {
	let drops = 0;
	for (let i = 0; i < nums.length; i++) {
		if ((nums[i] ?? 0) > (nums[(i + 1) % nums.length] ?? 0)) drops++;
	}
	return drops <= 1;
};
