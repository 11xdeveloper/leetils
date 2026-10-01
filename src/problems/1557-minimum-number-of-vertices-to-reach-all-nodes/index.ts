/**
 * 1557. Minimum Number of Vertices to Reach All Nodes
 *
 * Returns the smallest set of vertices of a directed acyclic graph from
 * which every vertex is reachable.
 *
 * A vertex with no incoming edge can only be reached from itself, so it
 * must be included; and every other vertex is reachable from one of those.
 *
 * @see https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfVerticesToReachAllNodes(6, [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]); // [0, 3]
 */
export const minimumNumberOfVerticesToReachAllNodes = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	const reached = new Uint8Array(n);
	for (const [, to = 0] of edges) reached[to] = 1;
	return Array.from({ length: n }, (_, v) => v).filter((v) => !reached[v]);
};
