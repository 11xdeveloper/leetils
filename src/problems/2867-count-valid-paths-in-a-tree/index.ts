/**
 * 2867. Count Valid Paths in a Tree
 *
 * In a tree of nodes 1 to `n`, a path is valid if exactly one of its
 * nodes is prime. Returns the number of valid paths between two distinct
 * nodes.
 *
 * Group the non-prime nodes into connected components. A valid path runs
 * through one prime, into at most two of its neighbouring components:
 * for each prime, count paths ending there and pairs across components.
 *
 * @see https://leetcode.com/problems/count-valid-paths-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n log log n + n α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * countValidPathsInATree(5, [[1, 2], [1, 3], [2, 4], [2, 5]]); // 4
 */
export const countValidPathsInATree = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const composite = new Uint8Array(n + 1);
	composite[1] = 1;
	for (let p = 2; p * p <= n; p++)
		if (!composite[p]) for (let m = p * p; m <= n; m += p) composite[m] = 1;

	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const size = Array.from({ length: n + 1 }, () => 1);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const up = parent[parent[x] ?? x] ?? x;
			parent[x] = up;
			x = up;
		}
		return x;
	};
	const neighbours: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
		if (composite[a] && composite[b]) {
			const ra = find(a);
			const rb = find(b);
			if (ra !== rb) {
				parent[ra] = rb;
				size[rb] = (size[rb] ?? 0) + (size[ra] ?? 0);
			}
		}
	}

	let paths = 0;
	for (let p = 2; p <= n; p++) {
		if (composite[p]) continue;
		let reached = 0;
		for (const next of neighbours[p] ?? []) {
			if (!composite[next]) continue;
			const component = size[find(next)] ?? 0;
			paths += component * (reached + 1);
			reached += component;
		}
	}
	return paths;
};
