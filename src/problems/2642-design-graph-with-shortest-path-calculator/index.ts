import { Heap } from "../../internal/heap";

/**
 * 2642. Design Graph With Shortest Path Calculator
 *
 * A weighted directed graph of `n` nodes. `addEdge` adds an edge
 * `[from, to, cost]`, and `shortestPath` returns the cheapest path cost
 * between two nodes, or -1 if there is none.
 *
 * Keep adjacency lists and run Dijkstra per query.
 *
 * @see https://leetcode.com/problems/design-graph-with-shortest-path-calculator/
 * @difficulty Hard
 * @timeComplexity O(1) to add an edge, O(e log e) per query
 * @spaceComplexity O(n + e)
 *
 * @example
 * const graph = new DesignGraphWithShortestPathCalculator(2, [[0, 1, 5]]);
 * graph.shortestPath(0, 1); // 5
 */
export class DesignGraphWithShortestPathCalculator {
	readonly #edges: [to: number, cost: number][][];

	constructor(n: number, edges: readonly (readonly number[])[]) {
		this.#edges = Array.from({ length: n }, () => []);
		for (const edge of edges) this.addEdge(edge);
	}

	addEdge(edge: readonly number[]): void {
		const [from = 0, to = 0, cost = 0] = edge;
		this.#edges[from]?.push([to, cost]);
	}

	shortestPath(node1: number, node2: number): number {
		const best = this.#edges.map(() => Number.POSITIVE_INFINITY);
		best[node1] = 0;
		const queue = new Heap<[cost: number, node: number]>(
			(a, b) => a[0] - b[0],
			[[0, node1]],
		);
		for (let entry = queue.pop(); entry; entry = queue.pop()) {
			const [cost, node] = entry;
			if (node === node2) return cost;
			if (cost > (best[node] ?? 0)) continue;
			for (const [next, weight] of this.#edges[node] ?? [])
				if (cost + weight < (best[next] ?? 0)) {
					best[next] = cost + weight;
					queue.push([cost + weight, next]);
				}
		}
		return -1;
	}
}
