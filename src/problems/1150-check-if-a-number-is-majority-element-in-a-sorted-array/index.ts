/**
 * 1150. Check If a Number Is Majority Element in a Sorted Array
 *
 * Returns whether `target` appears more than `nums.length / 2` times in the
 * sorted array `nums`.
 *
 * Binary searches for the first occurrence of `target`; it's a majority
 * exactly when the element half the array further on is also `target`.
 *
 * @see https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfANumberIsMajorityElementInASortedArray([2, 4, 5, 5, 5, 5, 5, 6, 6], 5); // true
 */
export const checkIfANumberIsMajorityElementInASortedArray = (
	nums: readonly number[],
	target: number,
): boolean => {
	let [low, high] = [0, nums.length];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((nums[mid] ?? 0) < target) low = mid + 1;
		else high = mid;
	}
	return nums[low + Math.floor(nums.length / 2)] === target;
};
