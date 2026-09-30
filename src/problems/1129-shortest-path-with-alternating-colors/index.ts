/**
 * 1129. Shortest Path with Alternating Colors
 *
 * A directed graph on nodes `0 … n − 1` has red and blue edges. Returns, for
 * each node, the length of the shortest path from node 0 whose edge colours
 * alternate, or -1 if there's none.
 *
 * Breadth-first search over (node, colour of the last edge) states, so each
 * step follows an edge of the other colour.
 *
 * @see https://leetcode.com/problems/shortest-path-with-alternating-colors/
 * @difficulty Medium
 * @timeComplexity O(n + r + b) for r red and b blue edges
 * @spaceComplexity O(n + r + b)
 *
 * @example
 * shortestPathWithAlternatingColors(3, [[0, 1]], [[2, 1]]); // [0, 1, -1]
 */
export const shortestPathWithAlternatingColors = (
	n: number,
	redEdges: readonly (readonly number[])[],
	blueEdges: readonly (readonly number[])[],
): number[] => {
	// Colour 0 is red and 1 is blue; out[colour][node] lists that colour's edges.
	const out = [redEdges, blueEdges].map((edges) => {
		const lists = Array.from({ length: n }, (): number[] => []);
		for (const [from = 0, to = 0] of edges) lists[from]?.push(to);
		return lists;
	});
	const result = new Array<number>(n).fill(-1);
	const seen = new Uint8Array(2 * n);
	// A state is node * 2 + the colour of the edge used to reach it.
	let frontier = [0, 1];
	seen[0] = 1;
	seen[1] = 1;
	for (let length = 0; frontier.length > 0; length++) {
		const next: number[] = [];
		for (const state of frontier) {
			const [node, colour] = [state >> 1, state & 1];
			if (result[node] === -1) result[node] = length;
			for (const neighbour of out[1 - colour]?.[node] ?? []) {
				const nextState = neighbour * 2 + (1 - colour);
				if (seen[nextState]) continue;
				seen[nextState] = 1;
				next.push(nextState);
			}
		}
		frontier = next;
	}
	return result;
};
