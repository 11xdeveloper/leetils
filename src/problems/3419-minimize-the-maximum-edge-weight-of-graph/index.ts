import { Heap } from "../../internal/heap";

/**
 * 3419. Minimize the Maximum Edge Weight of Graph
 *
 * Remove edges from a weighted directed graph so that every node can reach
 * node 0 and no node keeps more than `threshold` outgoing edges. Returns
 * the smallest possible largest remaining weight, or -1.
 *
 * Each node needs just one outgoing edge on its way to 0, so the threshold
 * never binds. The answer is the largest bottleneck: run a minimax
 * Dijkstra from 0 over the reversed edges.
 *
 * @see https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph/
 * @difficulty Medium
 * @timeComplexity O((n + e) log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * minimizeTheMaximumEdgeWeightOfGraph(5, [[1, 0, 1], [2, 0, 2], [3, 0, 1], [4, 3, 1], [2, 1, 1]], 2); // 1
 */
export const minimizeTheMaximumEdgeWeightOfGraph = (
	n: number,
	edges: readonly (readonly number[])[],
	_threshold: number,
): number => {
	const into: [from: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [a = 0, b = 0, w = 0] of edges) into[b]?.push([a, w]);
	const bottleneck = new Float64Array(n).fill(Number.POSITIVE_INFINITY);
	bottleneck[0] = 0;
	const queue = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, 0]]);
	for (let top = queue.pop(); top; top = queue.pop()) {
		const [worst, node] = top;
		if (worst > (bottleneck[node] ?? 0)) continue;
		for (const [from, w] of into[node] ?? []) {
			const through = Math.max(worst, w);
			if (through < (bottleneck[from] ?? 0)) {
				bottleneck[from] = through;
				queue.push([through, from]);
			}
		}
	}
	const answer = Math.max(...bottleneck);
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
