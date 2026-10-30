/**
 * 2876. Count Visited Nodes in a Directed Graph
 *
 * Every node `i` has one outgoing edge, to `edges[i]`. Following edges
 * from a node until one repeats, returns how many distinct nodes each
 * start visits.
 *
 * Walk from each unvisited node, recording the path. Hitting the path
 * again closes a cycle, whose nodes all see the whole cycle; hitting a
 * solved node gives a known count. Then unwind the tail, adding one per
 * step.
 *
 * @see https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countVisitedNodesInADirectedGraph([1, 2, 0, 0]); // [3, 3, 3, 4]
 */
export const countVisitedNodesInADirectedGraph = (
	edges: readonly number[],
): number[] => {
	const n = edges.length;
	const answer = Array.from({ length: n }, () => 0);
	const onPathAt = Array.from({ length: n }, () => -1);
	for (let start = 0; start < n; start++) {
		if (answer[start]) continue;
		const path: number[] = [];
		let node = start;
		while (!answer[node] && onPathAt[node] === -1) {
			onPathAt[node] = path.length;
			path.push(node);
			node = edges[node] ?? 0;
		}
		let end = path.length;
		if (!answer[node]) {
			const cycleStart = onPathAt[node] ?? 0;
			for (const member of path.slice(cycleStart))
				answer[member] = path.length - cycleStart;
			end = cycleStart;
		}
		for (let i = end - 1; i >= 0; i--) {
			const member = path[i] ?? 0;
			answer[member] = (answer[edges[member] ?? 0] ?? 0) + 1;
		}
		for (const member of path) onPathAt[member] = -1;
	}
	return answer;
};
