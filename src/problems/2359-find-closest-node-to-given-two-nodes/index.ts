/**
 * 2359. Find Closest Node to Given Two Nodes
 *
 * Each node has at most one outgoing edge, `edges[i]` (-1 for none).
 * Returns the node reachable from both `node1` and `node2` minimising the
 * larger of the two distances (smallest index on ties), or -1.
 *
 * Walk each path once, recording distances, then compare.
 *
 * @see https://leetcode.com/problems/find-closest-node-to-given-two-nodes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findClosestNodeToGivenTwoNodes([2, 2, 3, -1], 0, 1); // 2
 */
export const findClosestNodeToGivenTwoNodes = (
	edges: readonly number[],
	node1: number,
	node2: number,
): number => {
	const distances = (start: number): number[] => {
		const distance = edges.map(() => -1);
		for (
			let [node, d] = [start, 0];
			node !== -1 && distance[node] === -1;
			d++
		) {
			distance[node] = d;
			node = edges[node] ?? -1;
		}
		return distance;
	};
	const [from1, from2] = [distances(node1), distances(node2)];
	let [best, answer] = [Infinity, -1];
	for (let node = 0; node < edges.length; node++) {
		const [a = -1, b = -1] = [from1[node], from2[node]];
		if (a === -1 || b === -1) continue;
		if (Math.max(a, b) < best) [best, answer] = [Math.max(a, b), node];
	}
	return answer;
};
