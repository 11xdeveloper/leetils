/**
 * 265. Paint House II
 *
 * Returns the lowest cost to paint a row of houses with `k` colours, where
 * `costs[i][c]` is the cost of painting house `i` with colour `c`, and no
 * two neighbouring houses share a colour.
 *
 * Dynamic programming over the houses. Ending on colour `c` costs its price
 * plus the cheapest total for the house before using a different colour.
 * That's the cheapest total overall, unless it used `c` itself, in which
 * case it's the second cheapest. Tracking just those two keeps each house
 * O(k), as the follow-up asks.
 *
 * @see https://leetcode.com/problems/paint-house-ii/
 * @difficulty Hard
 * @timeComplexity O(n * k)
 * @spaceComplexity O(k)
 *
 * @example
 * paintHouseII([[1, 5, 3], [2, 9, 4]]); // 5
 */
export const paintHouseII = (costs: readonly (readonly number[])[]): number => {
	let totals = new Array<number>(costs[0]?.length ?? 0).fill(0);

	for (const houseCosts of costs) {
		let best = Number.POSITIVE_INFINITY;
		let secondBest = Number.POSITIVE_INFINITY;
		let bestColour = -1;
		for (const [colour, total] of totals.entries()) {
			if (total < best) {
				secondBest = best;
				best = total;
				bestColour = colour;
			} else if (total < secondBest) {
				secondBest = total;
			}
		}

		totals = houseCosts.map(
			(cost, colour) => cost + (colour === bestColour ? secondBest : best),
		);
	}

	return Math.min(...totals);
};
