/**
 * 787. Cheapest Flights Within K Stops
 *
 * Returns the cheapest price from `src` to `dst` using the directed
 * `flights` `[from, to, price]` with at most `k` stops in between, or -1 if
 * there's no such route.
 *
 * Bellman–Ford limited to `k + 1` rounds: after round `r`, `cost[v]` is the
 * cheapest price using at most `r` flights. Each round reads the previous
 * round's costs, so a single round can't chain two flights.
 *
 * @see https://leetcode.com/problems/cheapest-flights-within-k-stops/
 * @difficulty Medium
 * @timeComplexity O(k · E)
 * @spaceComplexity O(n)
 *
 * @example
 * cheapestFlightsWithinKStops(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1); // 700
 */
export const cheapestFlightsWithinKStops = (
	n: number,
	flights: readonly (readonly number[])[],
	src: number,
	dst: number,
	k: number,
): number => {
	let cost = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	cost[src] = 0;
	for (let round = 0; round <= k; round++) {
		const next = [...cost];
		for (const [from = 0, to = 0, price = 0] of flights) {
			next[to] = Math.min(next[to] ?? 0, (cost[from] ?? 0) + price);
		}
		cost = next;
	}
	const best = cost[dst] ?? Number.POSITIVE_INFINITY;
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
