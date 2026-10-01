/**
 * 802. Find Eventual Safe States
 *
 * In a directed graph (`graph[i]` lists `i`'s successors), a node is safe
 * if every path from it ends at a node with no outgoing edges. Returns the
 * safe nodes in ascending order.
 *
 * Works backwards from the terminal nodes with Kahn's algorithm on the
 * reversed graph: a node becomes safe once all its successors are safe.
 * Nodes that can reach a cycle never do.
 *
 * @see https://leetcode.com/problems/find-eventual-safe-states/
 * @difficulty Medium
 * @timeComplexity O(V + E)
 * @spaceComplexity O(V + E)
 *
 * @example
 * findEventualSafeStates([[1, 2], [2, 3], [5], [0], [5], [], []]); // [2, 4, 5, 6]
 */
export const findEventualSafeStates = (
	graph: readonly (readonly number[])[],
): number[] => {
	const n = graph.length;
	const predecessors: number[][] = Array.from({ length: n }, () => []);
	const unsafeSuccessors = graph.map((successors) => successors.length);
	for (const [node, successors] of graph.entries())
		for (const next of successors) predecessors[next]?.push(node);

	const queue = graph.flatMap((successors, node) =>
		successors.length === 0 ? [node] : [],
	);
	const safe = new Uint8Array(n);
	for (const node of queue) {
		safe[node] = 1;
		for (const previous of predecessors[node] ?? []) {
			unsafeSuccessors[previous] = (unsafeSuccessors[previous] ?? 0) - 1;
			if (unsafeSuccessors[previous] === 0) queue.push(previous);
		}
	}

	return Array.from({ length: n }, (_, node) => node).filter(
		(node) => safe[node],
	);
};
