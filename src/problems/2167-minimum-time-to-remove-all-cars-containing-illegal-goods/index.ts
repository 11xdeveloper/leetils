/**
 * 2167. Minimum Time to Remove All Cars Containing Illegal Goods
 *
 * Removing a car from either end of the train takes 1 unit; removing one
 * from anywhere costs 2. Returns the least time to remove every car marked
 * "1".
 *
 * `left` is the cheapest way to clear the cars up to `i`: remove that
 * whole prefix from the left, or extend the previous best, paying 2 for a
 * "1". Everything after `i` goes from the right.
 *
 * @see https://leetcode.com/problems/minimum-time-to-remove-all-cars-containing-illegal-goods/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToRemoveAllCarsContainingIllegalGoods("1100101"); // 5
 */
export const minimumTimeToRemoveAllCarsContainingIllegalGoods = (
	s: string,
): number => {
	const n = s.length;
	let [left, best] = [0, n];
	for (let i = 0; i < n; i++) {
		left = Math.min(left + (s[i] === "1" ? 2 : 0), i + 1);
		best = Math.min(best, left + n - 1 - i);
	}
	return best;
};
