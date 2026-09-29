/**
 * 540. Single Element in a Sorted Array
 *
 * In a sorted array where every element appears exactly twice except one,
 * returns the one that appears once, in O(log n) time.
 *
 * Before the single element, each pair starts at an even index; after it,
 * at an odd one. Binary search over the even indices checks whether the
 * pair starting there is intact, which says which side the single element
 * is on.
 *
 * @see https://leetcode.com/problems/single-element-in-a-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * singleElementInASortedArray([1, 1, 2, 3, 3, 4, 4, 8, 8]); // 2
 */
export const singleElementInASortedArray = (
	nums: readonly number[],
): number => {
	let low = 0;
	let high = nums.length - 1;
	while (low < high) {
		let mid = (low + high) >>> 1;
		if (mid % 2 === 1) mid--;
		if (nums[mid] === nums[mid + 1]) low = mid + 2;
		else high = mid;
	}
	return nums[low] ?? 0;
};
