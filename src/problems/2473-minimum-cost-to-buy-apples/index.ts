import { Heap } from "../../internal/heap";

/**
 * 2473. Minimum Cost to Buy Apples
 *
 * Starting from each city (1 to `n`), travel to some city, buy an apple
 * for `appleCost`, and return, where the return trip costs `k` times the
 * outbound roads. Returns the least cost from each city.
 *
 * A round trip of distance `d` costs `d · (k + 1)`. Run Dijkstra from all
 * cities at once, each starting at its own apple cost.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-buy-apples/
 * @difficulty Medium
 * @timeComplexity O((n + r) log r)
 * @spaceComplexity O(n + r)
 *
 * @example
 * minimumCostToBuyApples(3, [[1, 2, 5], [2, 3, 1], [3, 1, 2]], [2, 3, 1], 3); // [2, 3, 1]
 */
export const minimumCostToBuyApples = (
	n: number,
	roads: readonly (readonly number[])[],
	appleCost: readonly number[],
	k: number,
): number[] => {
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 1, b = 1, cost = 0] of roads) {
		neighbours[a - 1]?.push([b - 1, cost * (k + 1)]);
		neighbours[b - 1]?.push([a - 1, cost * (k + 1)]);
	}
	const best = [...appleCost];
	const heap = new Heap<[number, number]>(
		(a, b) => a[0] - b[0],
		best.map((cost, city): [number, number] => [cost, city]),
	);
	for (let entry = heap.pop(); entry; entry = heap.pop()) {
		const [cost, city] = entry;
		if (cost > (best[city] ?? Infinity)) continue;
		for (const [next, weight] of neighbours[city] ?? []) {
			if (cost + weight >= (best[next] ?? Infinity)) continue;
			best[next] = cost + weight;
			heap.push([cost + weight, next]);
		}
	}
	return best;
};
