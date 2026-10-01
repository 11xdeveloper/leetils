/**
 * 740. Delete and Earn
 *
 * Each move takes a number `x` from `nums`, earns `x` points and deletes
 * every `x - 1` and `x + 1`. Returns the most points possible.
 *
 * Taking one `x` makes taking all of them free, so each value is worth
 * `x · count(x)`, and neighbouring values can't both be taken. That's House
 * Robber over the values in order.
 *
 * @see https://leetcode.com/problems/delete-and-earn/
 * @difficulty Medium
 * @timeComplexity O(n + max)
 * @spaceComplexity O(max)
 *
 * @example
 * deleteAndEarn([2, 2, 3, 3, 3, 4]); // 9
 */
export const deleteAndEarn = (nums: readonly number[]): number => {
	const max = Math.max(...nums);
	const worth = new Array<number>(max + 1).fill(0);
	for (const num of nums) worth[num] = (worth[num] ?? 0) + num;

	let skip = 0;
	let take = 0;
	for (const points of worth)
		[skip, take] = [Math.max(skip, take), skip + points];
	return Math.max(skip, take);
};
