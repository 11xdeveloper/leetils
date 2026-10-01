/**
 * 198. House Robber
 *
 * Returns the most money that can be taken from a row of houses, where
 * `nums[i]` is the money in house `i`, without taking from two adjacent
 * houses.
 *
 * Dynamic programming: the best total up to each house either skips it or
 * takes it plus the best total up to two houses before. Keeps just the last
 * two totals.
 *
 * @see https://leetcode.com/problems/house-robber/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * houseRobber([2, 7, 9, 3, 1]); // 12, from houses 1, 3 and 5
 */
export const houseRobber = (nums: readonly number[]): number => {
	let twoBack = 0;
	let oneBack = 0;

	for (const money of nums) {
		[twoBack, oneBack] = [oneBack, Math.max(oneBack, twoBack + money)];
	}

	return oneBack;
};
