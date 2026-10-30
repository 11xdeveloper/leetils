/**
 * 2787. Ways to Express an Integer as Sum of Powers
 *
 * Returns the number of sets of distinct positive integers whose `x`-th
 * powers sum to `n`, modulo 1e9 + 7.
 *
 * 0/1 knapsack over the powers up to `n`.
 *
 * @see https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers/
 * @difficulty Medium
 * @timeComplexity O(n · n^(1/x))
 * @spaceComplexity O(n)
 *
 * @example
 * waysToExpressAnIntegerAsSumOfPowers(10, 2); // 1
 */
export const waysToExpressAnIntegerAsSumOfPowers = (
	n: number,
	x: number,
): number => {
	const ways = Array.from({ length: n + 1 }, (_, sum): number =>
		sum === 0 ? 1 : 0,
	);
	for (let base = 1; base ** x <= n; base++) {
		const power = base ** x;
		for (let sum = n; sum >= power; sum--)
			ways[sum] = ((ways[sum] ?? 0) + (ways[sum - power] ?? 0)) % 1_000_000_007;
	}
	return ways[n] ?? 0;
};
