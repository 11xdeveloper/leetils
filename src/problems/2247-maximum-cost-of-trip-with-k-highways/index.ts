/**
 * 2247. Maximum Cost of Trip With K Highways
 *
 * A trip crosses exactly `k` highways `[a, b, toll]` without visiting a
 * city twice. Returns the largest total toll of such a trip, or -1.
 *
 * DP over (set of visited cities, current city), at most 15 cities.
 *
 * @see https://leetcode.com/problems/maximum-cost-of-trip-with-k-highways/
 * @difficulty Hard
 * @timeComplexity O(2^n · n^2)
 * @spaceComplexity O(2^n · n)
 *
 * @example
 * maximumCostOfTripWithKHighways(5, [[0, 1, 4], [2, 1, 3], [1, 4, 11], [3, 2, 3], [3, 4, 2]], 3); // 17
 */
export const maximumCostOfTripWithKHighways = (
	n: number,
	highways: readonly (readonly number[])[],
	k: number,
): number => {
	if (k >= n) return -1;
	const toll = Array.from({ length: n }, () => new Array<number>(n).fill(-1));
	for (const [a = 0, b = 0, cost = 0] of highways) {
		(toll[a] ?? [])[b] = cost;
		(toll[b] ?? [])[a] = cost;
	}
	const best = Array.from({ length: 1 << n }, () =>
		new Array<number>(n).fill(-1),
	);
	for (let city = 0; city < n; city++) (best[1 << city] ?? [])[city] = 0;
	let answer = -1;
	for (let mask = 1; mask < 1 << n; mask++) {
		let visited = 0;
		for (let bits = mask; bits; bits &= bits - 1) visited++;
		for (let city = 0; city < n; city++) {
			const cost = best[mask]?.[city] ?? -1;
			if (cost < 0) continue;
			if (visited === k + 1) {
				answer = Math.max(answer, cost);
				continue;
			}
			for (let next = 0; next < n; next++) {
				const t = toll[city]?.[next] ?? -1;
				if (t < 0 || mask & (1 << next)) continue;
				const row = best[mask | (1 << next)] ?? [];
				row[next] = Math.max(row[next] ?? -1, cost + t);
			}
		}
	}
	return answer;
};
