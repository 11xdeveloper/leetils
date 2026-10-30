/**
 * 2368. Reachable Nodes With Restrictions
 *
 * Counts the nodes of a tree reachable from node 0 without visiting a
 * restricted node.
 *
 * Search from 0, treating restricted nodes as already visited.
 *
 * @see https://leetcode.com/problems/reachable-nodes-with-restrictions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reachableNodesWithRestrictions(7, [[0, 1], [1, 2], [3, 1], [4, 0], [0, 5], [5, 6]], [4, 5]); // 4
 */
export const reachableNodesWithRestrictions = (
	n: number,
	edges: readonly (readonly number[])[],
	restricted: readonly number[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const seen = new Uint8Array(n);
	for (const node of restricted) seen[node] = 1;
	seen[0] = 1;
	let count = 0;
	const stack = [0];
	for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
		count++;
		for (const next of neighbours[node] ?? []) {
			if (seen[next]) continue;
			seen[next] = 1;
			stack.push(next);
		}
	}
	return count;
};
