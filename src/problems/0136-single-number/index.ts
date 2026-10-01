/**
 * 136. Single Number
 *
 * Every value in `nums` appears twice except one. Returns that one.
 *
 * XOR of a value with itself is 0, so XOR-ing every value cancels the pairs
 * and leaves the single value.
 *
 * @see https://leetcode.com/problems/single-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * singleNumber([4, 1, 2, 1, 2]); // 4
 */
export const singleNumber = (nums: readonly number[]): number =>
	nums.reduce((single, num) => single ^ num, 0);
