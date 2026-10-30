/**
 * 2374. Node With Highest Edge Score
 *
 * Node `i` points to `edges[i]`; a node's edge score is the sum of the
 * labels pointing to it. Returns the node with the highest score (smallest
 * on ties).
 *
 * @see https://leetcode.com/problems/node-with-highest-edge-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nodeWithHighestEdgeScore([1, 0, 0, 0, 0, 7, 7, 5]); // 7
 */
export const nodeWithHighestEdgeScore = (edges: readonly number[]): number => {
	const scores = edges.map(() => 0);
	for (const [node, target] of edges.entries())
		scores[target] = (scores[target] ?? 0) + node;
	return scores.indexOf(Math.max(...scores));
};
