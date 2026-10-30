/**
 * 2527. Find Xor-Beauty of Array
 *
 * The xor-beauty is the XOR, over every triple of indices `(i, j, k)`, of
 * `(nums[i] | nums[j]) & nums[k]`. Returns it.
 *
 * Triples with `i ≠ j` cancel against `(j, i)`, leaving `nums[i] &
 * nums[k]`; those with `i ≠ k` cancel in turn, leaving the XOR of `nums`.
 *
 * @see https://leetcode.com/problems/find-xor-beauty-of-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findXorBeautyOfArray([1, 4]); // 5
 */
export const findXorBeautyOfArray = (nums: readonly number[]): number =>
	nums.reduce((xor, num) => xor ^ num, 0);
