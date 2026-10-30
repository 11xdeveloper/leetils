/**
 * 2929. Distribute Candies Among Children II
 *
 * Returns the number of ways to give `n` candies to three children with
 * none getting more than `limit`, for values too large to try every pair
 * of shares.
 *
 * For each share of the first child, the other two can split the rest in
 * a range of ways computed directly.
 *
 * @see https://leetcode.com/problems/distribute-candies-among-children-ii/
 * @difficulty Medium
 * @timeComplexity O(min(n, limit))
 * @spaceComplexity O(1)
 *
 * @example
 * distributeCandiesAmongChildrenII(3, 3); // 10
 */
export const distributeCandiesAmongChildrenII = (
	n: number,
	limit: number,
): number => {
	let ways = 0;
	for (let a = 0; a <= Math.min(n, limit); a++) {
		const rest = n - a;
		const low = Math.max(0, rest - limit);
		const high = Math.min(rest, limit);
		if (high >= low) ways += high - low + 1;
	}
	return ways;
};
