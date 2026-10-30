/**
 * 2685. Count the Number of Complete Components
 *
 * Returns how many connected components of the graph are complete: every
 * pair of their nodes joined by an edge.
 *
 * Find each component and check it has `v(v - 1) / 2` edges.
 *
 * @see https://leetcode.com/problems/count-the-number-of-complete-components/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * countTheNumberOfCompleteComponents(6, [[0, 1], [0, 2], [1, 2], [3, 4]]); // 3
 */
export const countTheNumberOfCompleteComponents = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const seen = new Uint8Array(n);
	let complete = 0;
	for (let start = 0; start < n; start++) {
		if (seen[start]) continue;
		seen[start] = 1;
		let nodes = 0;
		let degrees = 0;
		const stack = [start];
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			nodes++;
			degrees += neighbours[node]?.length ?? 0;
			for (const next of neighbours[node] ?? [])
				if (!seen[next]) {
					seen[next] = 1;
					stack.push(next);
				}
		}
		if (degrees === nodes * (nodes - 1)) complete++;
	}
	return complete;
};
