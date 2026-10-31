/**
 * 2360. Longest Cycle in a Graph
 *
 * Each node has at most one outgoing edge. Returns the length of the
 * longest cycle, or -1.
 *
 * Walk from each unvisited node, stamping nodes with their step number;
 * meeting a node stamped during this walk closes a cycle.
 *
 * @see https://leetcode.com/problems/longest-cycle-in-a-graph/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestCycleInAGraph([3, 3, 4, 2, 3]); // 3
 */
export const longestCycleInAGraph = (edges: readonly number[]): number => {
	const stamp = new Array<number>(edges.length).fill(0);
	let [clock, longest] = [1, -1];
	for (let start = 0; start < edges.length; start++) {
		if (stamp[start]) continue;
		const walkStart = clock;
		let node = start;
		while (node !== -1 && !stamp[node]) {
			stamp[node] = clock++;
			node = edges[node] ?? -1;
		}
		if (node !== -1 && (stamp[node] ?? 0) >= walkStart)
			longest = Math.max(longest, clock - (stamp[node] ?? 0));
	}
	return longest;
};
