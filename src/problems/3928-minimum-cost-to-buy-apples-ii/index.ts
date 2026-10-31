import { Heap } from "../../internal/heap";

/**
 * 3928. Minimum Cost to Buy Apples II
 *
 * Starting from each shop, buy apples there, or travel empty to another
 * shop, buy, and carry them back, paying each road's cost times its tax
 * on the way back. Returns the cheapest option for every shop.
 *
 * Roads are two-way, so from each buying shop j run Dijkstra twice, with
 * plain and with taxed costs; shop i pays prices[j] plus both distances.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-buy-apples-ii/
 * @difficulty Hard
 * @timeComplexity O(n · m log m + n²)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumCostToBuyApplesII(3, [10, 11, 1], [[0, 2, 1, 3], [1, 2, 3, 4], [0, 1, 5, 2]]); // [5, 11, 1]
 */
export const minimumCostToBuyApplesII = (
	n: number,
	prices: readonly number[],
	roads: readonly (readonly number[])[],
): number[] => {
	const adjacent: [to: number, cost: number, taxed: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, cost = 0, tax = 0] of roads) {
		adjacent[u]?.push([v, cost, cost * tax]);
		adjacent[v]?.push([u, cost, cost * tax]);
	}
	const shortest = (source: number, taxed: boolean): Float64Array => {
		const distance = new Float64Array(n).fill(Number.POSITIVE_INFINITY);
		distance[source] = 0;
		const heap = new Heap<[number, number]>(
			(a, b) => a[0] - b[0],
			[[0, source]],
		);
		while (heap.size > 0) {
			const [d, v] = heap.pop() ?? [0, 0];
			if (d > (distance[v] ?? 0)) continue;
			for (const [to, cost, carried] of adjacent[v] ?? []) {
				const next = d + (taxed ? carried : cost);
				if (next < (distance[to] ?? 0)) {
					distance[to] = next;
					heap.push([next, to]);
				}
			}
		}
		return distance;
	};
	const answer = [...prices];
	for (let j = 0; j < n; j++) {
		const [empty, carrying] = [shortest(j, false), shortest(j, true)];
		for (let i = 0; i < n; i++)
			answer[i] = Math.min(
				answer[i] ?? 0,
				(prices[j] ?? 0) + (empty[i] ?? 0) + (carrying[i] ?? 0),
			);
	}
	return answer;
};
