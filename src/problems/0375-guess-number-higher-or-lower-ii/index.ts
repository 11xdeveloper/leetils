/**
 * 375. Guess Number Higher or Lower II
 *
 * In a guessing game over 1 to `n`, each wrong guess `x` costs `x` dollars,
 * and you're told whether to go higher or lower. Returns the least money
 * that guarantees a win, whatever the picked number is.
 *
 * Interval dynamic programming: for each range, try every first guess,
 * whose worst case pays for the guess plus the more expensive of the two
 * sides it leaves; the range's cost is the best of those worst cases.
 *
 * @see https://leetcode.com/problems/guess-number-higher-or-lower-ii/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * guessNumberHigherOrLowerII(10); // 16
 */
export const guessNumberHigherOrLowerII = (n: number): number => {
	const size = n + 2;
	// cost[low * size + high]: money that guarantees a win within [low, high].
	const cost = new Array<number>(size * size).fill(0);

	for (let length = 2; length <= n; length++) {
		for (let low = 1; low + length - 1 <= n; low++) {
			const high = low + length - 1;
			let best = Number.POSITIVE_INFINITY;
			for (let guess = low; guess <= high; guess++) {
				const worst =
					guess +
					Math.max(
						cost[low * size + guess - 1] ?? 0,
						cost[(guess + 1) * size + high] ?? 0,
					);
				best = Math.min(best, worst);
			}
			cost[low * size + high] = best;
		}
	}

	return cost[1 * size + n] ?? 0;
};
