/**
 * 135. Candy
 *
 * Children in a line have `ratings`. Each gets at least one candy, and a
 * child rated higher than a neighbour gets more candy than that neighbour.
 * Returns the fewest candies needed.
 *
 * One pass from the left satisfies every left neighbour; a second from the
 * right satisfies every right neighbour while keeping the first pass's
 * minimums.
 *
 * @see https://leetcode.com/problems/candy/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * candy([1, 0, 2]); // 5: 2, 1 and 2 candies
 */
export const candy = (ratings: readonly number[]): number => {
	const candies = new Array<number>(ratings.length).fill(1);

	for (let i = 1; i < ratings.length; i++) {
		if ((ratings[i] ?? 0) > (ratings[i - 1] ?? 0)) {
			candies[i] = (candies[i - 1] ?? 0) + 1;
		}
	}
	for (let i = ratings.length - 2; i >= 0; i--) {
		if ((ratings[i] ?? 0) > (ratings[i + 1] ?? 0)) {
			candies[i] = Math.max(candies[i] ?? 0, (candies[i + 1] ?? 0) + 1);
		}
	}

	return candies.reduce((sum, count) => sum + count, 0);
};
