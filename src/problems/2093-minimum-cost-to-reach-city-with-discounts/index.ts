import { Heap } from "../../internal/heap";

/**
 * 2093. Minimum Cost to Reach City With Discounts
 *
 * Highways `[a, b, toll]` join cities both ways. Each of `discounts`
 * discounts halves (rounding down) one highway's toll. Returns the least
 * cost from city 0 to city `n - 1`, or -1 if unreachable.
 *
 * Dijkstra's algorithm over (city, discounts used) states.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts/
 * @difficulty Medium
 * @timeComplexity O(e · d · log(e · d))
 * @spaceComplexity O(n · d + e)
 *
 * @example
 * minimumCostToReachCityWithDiscounts(5, [[0, 1, 4], [2, 1, 3], [1, 4, 11], [3, 2, 3], [3, 4, 2]], 1); // 9
 */
export const minimumCostToReachCityWithDiscounts = (
	n: number,
	highways: readonly (readonly number[])[],
	discounts: number,
): number => {
	const roads: [city: number, toll: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [a = 0, b = 0, toll = 0] of highways) {
		roads[a]?.push([b, toll]);
		roads[b]?.push([a, toll]);
	}
	const best = Array.from({ length: n }, (_, city) =>
		Array.from({ length: discounts + 1 }, (_, used) =>
			city === 0 && used === 0 ? 0 : Infinity,
		),
	);
	const queue = new Heap<[cost: number, city: number, used: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0, 0]],
	);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [cost, city, used] = entry;
		if (city === n - 1) return cost;
		if (cost > (best[city]?.[used] ?? Infinity)) continue;
		for (const [next, toll] of roads[city] ?? []) {
			const options: [number, number][] = [[cost + toll, used]];
			if (used < discounts)
				options.push([cost + Math.floor(toll / 2), used + 1]);
			for (const [nextCost, nextUsed] of options) {
				const row = best[next] ?? [];
				if (nextCost >= (row[nextUsed] ?? Infinity)) continue;
				row[nextUsed] = nextCost;
				queue.push([nextCost, next, nextUsed]);
			}
		}
	}
	return -1;
};
