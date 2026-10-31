/**
 * 2551. Put Marbles in Bags
 *
 * Splitting a row of marbles into `k` contiguous bags scores, for each
 * bag, its first plus its last marble's weight. Returns the difference
 * between the largest and smallest possible scores.
 *
 * The ends of the row always count; each cut between marbles `i` and
 * `i + 1` adds `weights[i] + weights[i + 1]`. So sort those pair sums and
 * take the `k - 1` largest minus the `k - 1` smallest.
 *
 * @see https://leetcode.com/problems/put-marbles-in-bags/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * putMarblesInBags([1, 3, 5, 1], 2); // 4
 */
export const putMarblesInBags = (
	weights: readonly number[],
	k: number,
): number => {
	const pairs = weights
		.slice(1)
		.map((weight, i) => weight + (weights[i] ?? 0))
		.sort((a, b) => a - b);
	let difference = 0;
	for (let i = 0; i < k - 1; i++)
		difference += (pairs[pairs.length - 1 - i] ?? 0) - (pairs[i] ?? 0);
	return difference;
};
