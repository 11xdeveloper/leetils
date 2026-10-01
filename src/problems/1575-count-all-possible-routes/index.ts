/**
 * 1575. Count All Possible Routes
 *
 * Moving between cities costs the distance between their `locations`.
 * Counts the routes from `start` to `finish` (passing through any cities,
 * any number of times) using at most `fuel`, modulo 10^9 + 7.
 *
 * Dynamic programming over fuel: `ways[f][c]` counts routes from city `c`
 * to `finish` with `f` fuel left. It's 1 if `c` is the finish (stopping
 * there) plus the routes continuing to every affordable city.
 *
 * @see https://leetcode.com/problems/count-all-possible-routes/
 * @difficulty Hard
 * @timeComplexity O(fuel · n^2)
 * @spaceComplexity O(fuel · n)
 *
 * @example
 * countAllPossibleRoutes([4, 3, 1], 1, 0, 6); // 5
 */
export const countAllPossibleRoutes = (
	locations: readonly number[],
	start: number,
	finish: number,
	fuel: number,
): number => {
	const n = locations.length;
	const ways = Array.from({ length: fuel + 1 }, () =>
		new Array<number>(n).fill(0),
	);
	for (let left = 0; left <= fuel; left++) {
		const row = ways[left] ?? [];
		for (let city = 0; city < n; city++) {
			let total = city === finish ? 1 : 0;
			for (let next = 0; next < n; next++) {
				const cost = Math.abs((locations[city] ?? 0) - (locations[next] ?? 0));
				if (next !== city && cost <= left)
					total = (total + (ways[left - cost]?.[next] ?? 0)) % 1_000_000_007;
			}
			row[city] = total;
		}
	}
	return ways[fuel]?.[start] ?? 0;
};
