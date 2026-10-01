/**
 * 1627. Graph Connectivity With Threshold
 *
 * Cities `1 … n` are linked when they share a divisor greater than
 * `threshold`. Answers whether each queried pair is connected.
 *
 * Every number is linked to its multiples by any divisor `z > threshold`,
 * so union each such `z` with all its multiples (a harmonic sum of work),
 * then compare the queried roots.
 *
 * @see https://leetcode.com/problems/graph-connectivity-with-threshold/
 * @difficulty Hard
 * @timeComplexity O(n log n · α(n) + q · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * graphConnectivityWithThreshold(6, 2, [[1, 4], [2, 5], [3, 6]]); // [false, false, true]
 */
export const graphConnectivityWithThreshold = (
	n: number,
	threshold: number,
	queries: readonly (readonly number[])[],
): boolean[] => {
	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	for (let z = threshold + 1; z <= n; z++) {
		for (let multiple = 2 * z; multiple <= n; multiple += z)
			parent[find(multiple)] = find(z);
	}
	return queries.map(([a = 0, b = 0]) => find(a) === find(b));
};
