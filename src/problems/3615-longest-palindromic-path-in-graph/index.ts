/**
 * 3615. Longest Palindromic Path in Graph
 *
 * Node i of an undirected graph (n ≤ 14) has letter `label[i]`. Returns
 * the most nodes on a simple path whose letters read the same backwards.
 *
 * Grow palindromes outwards from their middle (a node, or an edge between
 * equal letters): a state is the set of nodes used and the two ends, and
 * it extends to unused neighbours of both ends with equal letters.
 *
 * @see https://leetcode.com/problems/longest-palindromic-path-in-graph/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n⁴)
 * @spaceComplexity O(2ⁿ · n²)
 *
 * @example
 * longestPalindromicPathInGraph(3, [[0, 1], [1, 2]], "aba"); // 3
 */
export const longestPalindromicPathInGraph = (
	n: number,
	edges: readonly (readonly number[])[],
	label: string,
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const seen = new Uint8Array((1 << n) * n * n);
	const queue: number[] = [];
	const visit = (mask: number, a: number, b: number): void => {
		const [x, y] = a < b ? [a, b] : [b, a];
		const key = (mask * n + x) * n + y;
		if (seen[key]) return;
		seen[key] = 1;
		queue.push(mask, x, y);
	};
	for (let v = 0; v < n; v++) visit(1 << v, v, v);
	for (const [u = 0, v = 0] of edges)
		if (label[u] === label[v]) visit((1 << u) | (1 << v), u, v);
	let best = 0;
	for (let q = 0; q < queue.length; q += 3) {
		const [mask = 0, a = 0, b = 0] = [queue[q], queue[q + 1], queue[q + 2]];
		let size = 0;
		for (let m = mask; m; m &= m - 1) size++;
		best = Math.max(best, size);
		for (const x of adjacent[a] ?? []) {
			if ((mask >> x) & 1) continue;
			for (const y of adjacent[b] ?? [])
				if (x !== y && !((mask >> y) & 1) && label[x] === label[y])
					visit(mask | (1 << x) | (1 << y), x, y);
		}
	}
	return best;
};
