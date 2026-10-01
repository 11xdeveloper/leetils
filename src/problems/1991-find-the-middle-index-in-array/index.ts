/**
 * 1991. Find the Middle Index in Array
 *
 * Returns the leftmost index whose left and right sums are equal, or -1.
 *
 * Compare a running left sum against the total.
 *
 * @see https://leetcode.com/problems/find-the-middle-index-in-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMiddleIndexInArray([2, 3, -1, 8, 4]); // 3
 */
export const findTheMiddleIndexInArray = (nums: readonly number[]): number => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	let left = 0;
	for (const [i, num] of nums.entries()) {
		if (left === total - left - num) return i;
		left += num;
	}
	return -1;
};
