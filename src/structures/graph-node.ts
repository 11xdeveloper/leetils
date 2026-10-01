/**
 * A node in an undirected graph, matching the `Node` class LeetCode provides
 * for graph problems like Clone Graph.
 */
export class GraphNode {
	val: number;
	neighbors: GraphNode[];

	constructor(val?: number, neighbors?: GraphNode[]) {
		this.val = val ?? 0;
		this.neighbors = neighbors ?? [];
	}
}

/**
 * Builds a graph from LeetCode's adjacency list format, where the nodes are
 * numbered from 1 and `adjList[i]` lists the neighbors of node `i + 1`.
 * Returns node 1, or `null` for an empty list.
 *
 * @example
 * graphFromAdjacencyList([[2, 4], [1, 3], [2, 4], [1, 3]]); // node 1, in a square of 4 nodes
 */
export const graphFromAdjacencyList = (
	adjList: readonly (readonly number[])[],
): GraphNode | null => {
	const nodes = adjList.map((_, i) => new GraphNode(i + 1));

	for (const [i, neighbors] of adjList.entries()) {
		for (const neighbor of neighbors) {
			const node = nodes[neighbor - 1];
			if (node) nodes[i]?.neighbors.push(node);
		}
	}

	return nodes[0] ?? null;
};

/**
 * Converts the graph reachable from `node` back into LeetCode's adjacency
 * list format. Nodes must be numbered from 1 with no gaps, as LeetCode's are.
 *
 * @example
 * graphToAdjacencyList(graphFromAdjacencyList([[2], [1]])); // [[2], [1]]
 */
export const graphToAdjacencyList = (node: GraphNode | null): number[][] => {
	if (!node) return [];

	const seen = new Set([node]);
	const queue = [node];
	for (let head = 0; head < queue.length; head++) {
		for (const neighbor of queue[head]?.neighbors ?? []) {
			if (!seen.has(neighbor)) {
				seen.add(neighbor);
				queue.push(neighbor);
			}
		}
	}

	const adjList: number[][] = Array.from({ length: queue.length }, () => []);
	for (const { val, neighbors } of queue) {
		adjList[val - 1] = neighbors.map((neighbor) => neighbor.val);
	}
	return adjList;
};
