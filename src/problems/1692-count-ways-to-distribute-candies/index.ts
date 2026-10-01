/**
 * 1692. Count Ways to Distribute Candies
 *
 * Counts the ways to split `n` distinct candies into `k` identical
 * non-empty bags, modulo 10^9 + 7.
 *
 * That's the Stirling number of the second kind: candy `n` either sits
 * alone (`S(n − 1, k − 1)`) or joins one of `k` bags (`k · S(n − 1, k)`).
 * One row is kept, updated from the right.
 *
 * @see https://leetcode.com/problems/count-ways-to-distribute-candies/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * countWaysToDistributeCandies(4, 2); // 7
 */
export const countWaysToDistributeCandies = (n: number, k: number): number => {
	const ways = new Array<number>(k + 1).fill(0);
	ways[0] = 1;
	for (let candies = 1; candies <= n; candies++) {
		for (let bags = Math.min(candies, k); bags >= 1; bags--) {
			ways[bags] =
				(bags * (ways[bags] ?? 0) + (ways[bags - 1] ?? 0)) % 1_000_000_007;
		}
		ways[0] = 0;
	}
	return ways[k] ?? 0;
};
