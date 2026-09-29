import { houseRobber } from "../0198-house-robber";

/**
 * 213. House Robber II
 *
 * Returns the most money that can be taken from houses arranged in a circle,
 * where `nums[i]` is the money in house `i`, without taking from two
 * adjacent houses. The first and last houses are adjacent.
 *
 * The first and last houses can't both be robbed, so the answer is the
 * better of robbing a row without the last house and a row without the
 * first, each solved with House Robber.
 *
 * @see https://leetcode.com/problems/house-robber-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the two slices
 *
 * @example
 * houseRobberII([2, 3, 2]); // 3
 */
export const houseRobberII = (nums: readonly number[]): number => {
	if (nums.length === 1) return nums[0] ?? 0;
	return Math.max(houseRobber(nums.slice(0, -1)), houseRobber(nums.slice(1)));
};
