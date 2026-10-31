/**
 * 3840. House Robber V
 *
 * Rob houses along a street, never two neighbours with the same `colors`
 * code. Returns the most money.
 *
 * Track the best total with and without robbing the latest house; robbing
 * after a robbed neighbour needs their colours to differ.
 *
 * @see https://leetcode.com/problems/house-robber-v/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * houseRobberV([10, 1, 3, 9], [1, 1, 1, 2]); // 22
 */
export const houseRobberV = (
	nums: readonly number[],
	colors: readonly number[],
): number => {
	let [robbed, skipped] = [Number.NEGATIVE_INFINITY, 0];
	nums.forEach((money, i) => {
		const afterRobbed =
			i > 0 && colors[i - 1] !== colors[i] ? robbed : Number.NEGATIVE_INFINITY;
		[robbed, skipped] = [
			money + Math.max(skipped, afterRobbed),
			Math.max(robbed, skipped),
		];
	});
	return Math.max(robbed, skipped);
};
