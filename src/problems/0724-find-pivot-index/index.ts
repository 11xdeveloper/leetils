/**
 * 724. Find Pivot Index
 *
 * Returns the leftmost index where the sum of the numbers to its left
 * equals the sum of those to its right, or -1 if there's none.
 *
 * With the total known, the right-hand sum at each index is the total
 * minus the left-hand sum and the number itself.
 *
 * @see https://leetcode.com/problems/find-pivot-index/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findPivotIndex([1, 7, 3, 6, 5, 6]); // 3
 */
export const findPivotIndex = (nums: readonly number[]): number => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	let left = 0;
	for (const [i, num] of nums.entries()) {
		if (left === total - left - num) return i;
		left += num;
	}
	return -1;
};
