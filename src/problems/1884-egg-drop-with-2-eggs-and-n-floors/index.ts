/**
 * 1884. Egg Drop With 2 Eggs and N Floors
 *
 * Returns the fewest drops that always find the highest safe floor among
 * `n` with two eggs.
 *
 * With `k` drops, the first egg can be dropped at floors `k`, `k + (k−1)`,
 * … so `k` drops cover `k(k+1)/2` floors; find the smallest such `k`.
 *
 * @see https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors/
 * @difficulty Medium
 * @timeComplexity O(√n)
 * @spaceComplexity O(1)
 *
 * @example
 * eggDropWith2EggsAndNFloors(100); // 14
 */
export const eggDropWith2EggsAndNFloors = (n: number): number => {
	let drops = 0;
	while ((drops * (drops + 1)) / 2 < n) drops++;
	return drops;
};
