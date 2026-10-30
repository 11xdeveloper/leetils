/**
 * 2493. Divide Nodes Into the Maximum Number of Groups
 *
 * Assigns nodes to numbered groups so every edge joins consecutive groups.
 * Returns the most groups possible, or -1.
 *
 * Each component must be bipartite. Its most groups is its largest
 * breadth-first depth from any starting node; components add up.
 *
 * @see https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups/
 * @difficulty Hard
 * @timeComplexity O(n · (n + e))
 * @spaceComplexity O(n + e)
 *
 * @example
 * divideNodesIntoTheMaximumNumberOfGroups(6, [[1, 2], [1, 4], [1, 5], [2, 6], [2, 3], [4, 6]]); // 4
 */
export const divideNodesIntoTheMaximumNumberOfGroups = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const neighbours: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	/** Breadth-first levels from `start`, or -1 if an edge stays within a level. */
	const levels = (start: number): [count: number, reached: number[]] => {
		const depth = new Array<number>(n + 1).fill(-1);
		depth[start] = 0;
		const queue = [start];
		let deepest = 0;
		for (let head = 0; head < queue.length; head++) {
			const node = queue[head] ?? 0;
			const d = depth[node] ?? 0;
			deepest = Math.max(deepest, d);
			for (const next of neighbours[node] ?? []) {
				if (depth[next] === -1) {
					depth[next] = d + 1;
					queue.push(next);
				} else if (depth[next] === d) return [-1, queue];
			}
		}
		return [deepest + 1, queue];
	};
	const component = new Array<number>(n + 1).fill(-1);
	const best = new Map<number, number>();
	for (let node = 1; node <= n; node++) {
		const [count, reached] = levels(node);
		if (count === -1) return -1;
		if (component[node] === -1)
			for (const member of reached) component[member] = node;
		const id = component[node] ?? node;
		best.set(id, Math.max(best.get(id) ?? 0, count));
	}
	let total = 0;
	for (const count of best.values()) total += count;
	return total;
};
