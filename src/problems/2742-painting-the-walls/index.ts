/**
 * 2742. Painting the Walls
 *
 * A paid painter takes `time[i]` units and `cost[i]` money for wall `i`;
 * meanwhile a free painter paints any other wall in 1 unit, but only
 * while the paid one is busy. Returns the cheapest way to paint every
 * wall.
 *
 * Paying for wall `i` also buys `time[i]` free walls, so it covers
 * `time[i] + 1` walls in all. Knapsack: the cheapest way to cover at
 * least `j` walls.
 *
 * @see https://leetcode.com/problems/painting-the-walls/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * paintingTheWalls([1, 2, 3, 2], [1, 2, 3, 2]); // 3
 */
export const paintingTheWalls = (
	cost: readonly number[],
	time: readonly number[],
): number => {
	const n = cost.length;
	const cheapest = Array.from({ length: n + 1 }, (_, j) =>
		j === 0 ? 0 : Number.POSITIVE_INFINITY,
	);
	for (const [i, price] of cost.entries()) {
		const covers = (time[i] ?? 0) + 1;
		for (let j = n; j > 0; j--)
			cheapest[j] = Math.min(
				cheapest[j] ?? 0,
				(cheapest[Math.max(0, j - covers)] ?? 0) + price,
			);
	}
	return cheapest[n] ?? 0;
};
