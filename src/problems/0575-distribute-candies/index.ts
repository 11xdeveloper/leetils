/**
 * 575. Distribute Candies
 *
 * Alice has `n` candies (`n` even) of types `candyType`, and may eat only
 * `n / 2` of them. Returns the most different types she can eat.
 *
 * She can't eat more types than exist, nor more candies than `n / 2`.
 *
 * @see https://leetcode.com/problems/distribute-candies/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * distributeCandies([1, 1, 2, 2, 3, 3]); // 3
 */
export const distributeCandies = (candyType: readonly number[]): number =>
	Math.min(new Set(candyType).size, candyType.length / 2);
