import { describe, expect, it } from "bun:test";
import {
	type GraphNode,
	graphFromAdjacencyList,
	graphToAdjacencyList,
} from "../../structures/graph-node";
import { createRandom } from "../../testing/random";
import { cloneGraph } from ".";

const nodesOf = (node: GraphNode | null): Set<GraphNode> => {
	const seen = new Set<GraphNode>();
	const stack = node ? [node] : [];
	for (let next = stack.pop(); next; next = stack.pop()) {
		if (seen.has(next)) continue;
		seen.add(next);
		stack.push(...next.neighbors);
	}
	return seen;
};

describe("133. Clone Graph", () => {
	it("solves the examples from the problem statement", () => {
		const adjList = [
			[2, 4],
			[1, 3],
			[2, 4],
			[1, 3],
		];
		expect(
			graphToAdjacencyList(cloneGraph(graphFromAdjacencyList(adjList))),
		).toEqual(adjList);
		expect(
			graphToAdjacencyList(cloneGraph(graphFromAdjacencyList([[]]))),
		).toEqual([[]]);
		expect(cloneGraph(null)).toBeNull();
	});

	it("copies random connected graphs without sharing any nodes", () => {
		const random = createRandom(133);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = new Set<string>();
			// A random spanning tree keeps the graph connected; extra edges add cycles.
			for (let v = 2; v <= n; v++) edges.add(`${random.int(1, v - 1)},${v}`);
			for (let extra = random.int(0, n); extra > 0; extra--) {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				if (a !== b) edges.add(`${Math.min(a, b)},${Math.max(a, b)}`);
			}
			const adjList: number[][] = Array.from({ length: n }, () => []);
			for (const edge of edges) {
				const [a = 0, b = 0] = edge.split(",").map(Number);
				adjList[a - 1]?.push(b);
				adjList[b - 1]?.push(a);
			}

			const original = graphFromAdjacencyList(adjList);
			const copy = cloneGraph(original);
			expect(graphToAdjacencyList(copy)).toEqual(adjList);
			const originalNodes = nodesOf(original);
			for (const node of nodesOf(copy))
				expect(originalNodes.has(node)).toBeFalse();
		}
	});
});
