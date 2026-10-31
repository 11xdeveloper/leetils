/**
 * 2421. Number of Good Paths
 *
 * A good path in a tree starts and ends at nodes of equal value with no
 * larger value between them (single nodes count). Counts the good paths.
 *
 * Add nodes in increasing value, joining each to smaller-or-equal
 * neighbours with union-find. Nodes of the current value sharing a
 * component pair up.
 *
 * @see https://leetcode.com/problems/number-of-good-paths/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfGoodPaths([1, 3, 2, 1, 3], [[0, 1], [0, 2], [2, 3], [2, 4]]); // 6
 */
export const numberOfGoodPaths = (
	vals: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const n = vals.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	const order = Array.from({ length: n }, (_, i) => i).sort(
		(a, b) => (vals[a] ?? 0) - (vals[b] ?? 0),
	);
	let paths = 0;
	for (let start = 0; start < n; ) {
		const value = vals[order[start] ?? 0] ?? 0;
		let end = start;
		while (end < n && vals[order[end] ?? 0] === value) end++;
		const group = order.slice(start, end);
		for (const node of group)
			for (const next of neighbours[node] ?? [])
				if ((vals[next] ?? 0) <= value) parent[find(node)] = find(next);
		const perComponent = new Map<number, number>();
		for (const node of group) {
			const root = find(node);
			const count = (perComponent.get(root) ?? 0) + 1;
			perComponent.set(root, count);
			paths += count;
		}
		start = end;
	}
	return paths;
};
