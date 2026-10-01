import { Heap } from "../../internal/heap";

/**
 * 1514. Path with Maximum Probability
 *
 * Each undirected edge `edges[i]` succeeds with probability `succProb[i]`.
 * Returns the highest probability of getting from `start_node` to
 * `end_node`, or 0 if they aren't connected.
 *
 * Dijkstra's algorithm with products instead of sums: probabilities only
 * shrink along a path, so the most likely unsettled node can be settled,
 * using a max-heap.
 *
 * @see https://leetcode.com/problems/path-with-maximum-probability/
 * @difficulty Medium
 * @timeComplexity O((n + e) log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * pathWithMaximumProbability(3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2); // 0.25
 */
export const pathWithMaximumProbability = (
	n: number,
	edges: readonly (readonly number[])[],
	succProb: readonly number[],
	start_node: number,
	end_node: number,
): number => {
	const neighbours = Array.from({ length: n }, (): [number, number][] => []);
	edges.forEach(([a = 0, b = 0], i) => {
		const p = succProb[i] ?? 0;
		neighbours[a]?.push([b, p]);
		neighbours[b]?.push([a, p]);
	});
	const best = new Array<number>(n).fill(0);
	best[start_node] = 1;
	const heap = new Heap<[number, number]>(
		(a, b) => b[0] - a[0],
		[[1, start_node]],
	);
	for (let item = heap.pop(); item; item = heap.pop()) {
		const [chance, node] = item;
		if (node === end_node) return chance;
		if (chance < (best[node] ?? 0)) continue;
		for (const [next, p] of neighbours[node] ?? []) {
			const through = chance * p;
			if (through <= (best[next] ?? 0)) continue;
			best[next] = through;
			heap.push([through, next]);
		}
	}
	return 0;
};
