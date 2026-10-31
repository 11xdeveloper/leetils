/**
 * 3841. Palindromic Path Queries in a Tree
 *
 * Each tree node holds a letter. Queries either change a node's letter
 * ("update u c") or ask whether the letters on the path from u to v can
 * be rearranged into a palindrome ("query u v").
 *
 * A rearrangement exists when at most one letter appears an odd number of
 * times. Let P[x] be the XOR of letter bits from the root to x: the path's
 * parity mask is P[u] ^ P[v] ^ bit(lca). An update flips one bit for a
 * whole subtree, a range on the Euler tour, kept in a XOR Fenwick tree.
 *
 * @see https://leetcode.com/problems/palindromic-path-queries-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * palindromicPathQueriesInATree(3, [[0, 1], [1, 2]], "aac", ["query 0 2", "update 1 b", "query 0 2"]); // [true, false]
 */
export const palindromicPathQueriesInATree = (
	n: number,
	edges: readonly (readonly number[])[],
	s: string,
	queries: readonly string[],
): boolean[] => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	let levels = 1;
	while (1 << levels < n) levels++;
	const up: Int32Array[] = Array.from(
		{ length: levels },
		() => new Int32Array(n),
	);
	const depth = new Int32Array(n);
	const enter = new Int32Array(n);
	const leave = new Int32Array(n);
	// Iterative depth-first search for the Euler tour.
	let time = 0;
	const stack: [node: number, next: number][] = [[0, 0]];
	const seen = new Uint8Array(n);
	seen[0] = 1;
	while (stack.length > 0) {
		const frame = stack.at(-1) ?? [0, 0];
		const [v, next] = frame;
		if (next === 0) enter[v] = time++;
		const neighbours = adjacent[v] ?? [];
		if (next < neighbours.length) {
			frame[1]++;
			const to = neighbours[next] ?? 0;
			if (seen[to]) continue;
			seen[to] = 1;
			(up[0] as Int32Array)[to] = v;
			depth[to] = (depth[v] ?? 0) + 1;
			stack.push([to, 0]);
		} else {
			leave[v] = time;
			stack.pop();
		}
	}
	for (let level = 1; level < levels; level++)
		for (let v = 0; v < n; v++)
			(up[level] as Int32Array)[v] =
				up[level - 1]?.[up[level - 1]?.[v] ?? 0] ?? 0;
	const lca = (a: number, b: number): number => {
		let [x, y] = (depth[a] ?? 0) >= (depth[b] ?? 0) ? [a, b] : [b, a];
		for (let level = levels - 1; level >= 0; level--)
			if ((depth[x] ?? 0) - (1 << level) >= (depth[y] ?? 0))
				x = up[level]?.[x] ?? 0;
		if (x === y) return x;
		for (let level = levels - 1; level >= 0; level--)
			if (up[level]?.[x] !== up[level]?.[y])
				[x, y] = [up[level]?.[x] ?? 0, up[level]?.[y] ?? 0];
		return up[0]?.[x] ?? 0;
	};
	const tree = new Int32Array(n + 1);
	const flip = (i: number, mask: number): void => {
		for (i++; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) ^ mask;
	};
	const pathMask = (v: number): number => {
		let mask = 0;
		for (let i = (enter[v] ?? 0) + 1; i > 0; i -= i & -i) mask ^= tree[i] ?? 0;
		return mask;
	};
	const letters = [...s].map((c) => 1 << (c.charCodeAt(0) - 97));
	const toggle = (v: number, mask: number): void => {
		flip(enter[v] ?? 0, mask);
		flip(leave[v] ?? 0, mask);
	};
	letters.forEach((bit, v) => {
		toggle(v, bit);
	});
	const answers: boolean[] = [];
	for (const query of queries) {
		const [kind, a = "0", b = "0"] = query.split(" ");
		const u = Number(a);
		if (kind === "update") {
			const bit = 1 << (b.charCodeAt(0) - 97);
			toggle(u, (letters[u] ?? 0) ^ bit);
			letters[u] = bit;
			continue;
		}
		const v = Number(b);
		const mask = pathMask(u) ^ pathMask(v) ^ (letters[lca(u, v)] ?? 0);
		answers.push((mask & (mask - 1)) === 0);
	}
	return answers;
};
