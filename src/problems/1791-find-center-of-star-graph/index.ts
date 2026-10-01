/**
 * 1791. Find Center of Star Graph
 *
 * Returns the centre of a star graph, the node on every edge.
 *
 * It's the node the first two edges share.
 *
 * @see https://leetcode.com/problems/find-center-of-star-graph/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findCenterOfStarGraph([[1, 2], [2, 3], [4, 2]]); // 2
 */
export const findCenterOfStarGraph = (
	edges: readonly (readonly number[])[],
): number => {
	const [a = 0, b = 0] = edges[0] ?? [];
	const second = edges[1] ?? [];
	return second.includes(a) ? a : b;
};
