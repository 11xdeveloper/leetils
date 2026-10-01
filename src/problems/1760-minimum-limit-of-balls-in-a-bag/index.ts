/**
 * 1760. Minimum Limit of Balls in a Bag
 *
 * Each operation splits a bag into two non-empty bags. With at most
 * `maxOperations`, returns the smallest possible size of the largest bag.
 *
 * Binary search the limit: a bag of `b` balls needs `⌈b / limit⌉ − 1`
 * splits to get within it.
 *
 * @see https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/
 * @difficulty Medium
 * @timeComplexity O(n log M) for the largest bag M
 * @spaceComplexity O(1)
 *
 * @example
 * minimumLimitOfBallsInABag([2, 4, 8, 2], 4); // 2
 */
export const minimumLimitOfBallsInABag = (
	nums: readonly number[],
	maxOperations: number,
): number => {
	let [low, high] = [1, Math.max(...nums)];
	while (low < high) {
		const limit = Math.floor((low + high) / 2);
		const needed = nums.reduce(
			(sum, balls) => sum + Math.ceil(balls / limit) - 1,
			0,
		);
		if (needed <= maxOperations) high = limit;
		else low = limit + 1;
	}
	return low;
};
