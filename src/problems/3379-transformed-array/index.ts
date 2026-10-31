/**
 * 3379. Transformed Array
 *
 * For each index i of the circular array `nums`, the element `nums[i]`
 * steps away (right if positive, left if negative).
 *
 * Index modulo the length, correcting negative remainders.
 *
 * @see https://leetcode.com/problems/transformed-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * transformedArray([3, -2, 1, 1]); // [1, 1, 1, 3]
 */
export const transformedArray = (nums: readonly number[]): number[] => {
	const n = nums.length;
	return nums.map((num, i) => nums[(((i + num) % n) + n) % n] ?? 0);
};
