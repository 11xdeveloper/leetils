import { GraphNode } from "../../structures/graph-node";

/**
 * 133. Clone Graph
 *
 * Returns a deep copy of the connected undirected graph containing `node`:
 * new nodes with the same values and the same connections.
 *
 * Breadth-first search, mapping each original node to its copy as soon as
 * it's reached, so each copy's neighbours can be filled in when its original
 * is visited.
 *
 * @see https://leetcode.com/problems/clone-graph/
 * @difficulty Medium
 * @timeComplexity O(V + E)
 * @spaceComplexity O(V)
 *
 * @example
 * graphToAdjacencyList(cloneGraph(graphFromAdjacencyList([[2, 4], [1, 3], [2, 4], [1, 3]])));
 * // [[2, 4], [1, 3], [2, 4], [1, 3]]
 */
export const cloneGraph = (node: GraphNode | null): GraphNode | null => {
	if (!node) return null;

	const copies = new Map([[node, new GraphNode(node.val)]]);
	const queue = [node];

	for (let head = 0; head < queue.length; head++) {
		const original = queue[head];
		const copy = original && copies.get(original);
		if (!original || !copy) break;

		for (const neighbour of original.neighbors) {
			let neighbourCopy = copies.get(neighbour);
			if (!neighbourCopy) {
				neighbourCopy = new GraphNode(neighbour.val);
				copies.set(neighbour, neighbourCopy);
				queue.push(neighbour);
			}
			copy.neighbors.push(neighbourCopy);
		}
	}

	return copies.get(node) ?? null;
};
