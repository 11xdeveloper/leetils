/**
 * 3590. Kth Smallest Path XOR Sum
 *
 * In a tree rooted at 0, a node's path XOR is the XOR of the values from
 * the root to it. For each query `[u, k]`, returns the k-th smallest
 * distinct path XOR among u's subtree, or -1.
 *
 * Sack (DSU on tree): visit light children and discard what they added,
 * then the heavy child keeping its values, then add the light subtrees
 * again. A Fenwick tree over the distinct values marks which are present
 * and finds the k-th by descending its levels.
 *
 * @see https://leetcode.com/problems/kth-smallest-path-xor-sum/
 * @difficulty Hard
 * @timeComplexity O(n log² n + q log n)
 * @spaceComplexity O(n + q)
 *
 * @example
 * kthSmallestPathXorSum([-1, 0, 0], [1, 1, 1], [[0, 1], [0, 2], [0, 3]]); // [0, 1, -1]
 */
export const kthSmallestPathXorSum = (
	par: readonly number[],
	vals: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = vals.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	par.forEach((p, i) => {
		if (p >= 0) children[p]?.push(i);
	});
	// Euler order, so each subtree is a contiguous run.
	const order: number[] = [];
	const xor = new Int32Array(n);
	const stack = [0];
	xor[0] = vals[0] ?? 0;
	while (stack.length > 0) {
		const v = stack.pop() ?? 0;
		order.push(v);
		for (const child of children[v] ?? []) {
			xor[child] = (xor[v] ?? 0) ^ (vals[child] ?? 0);
			stack.push(child);
		}
	}
	const start = new Int32Array(n);
	order.forEach((v, i) => {
		start[v] = i;
	});
	const size = new Int32Array(n).fill(1);
	for (let i = n - 1; i > 0; i--) {
		const v = order[i] ?? 0;
		size[par[v] ?? 0] = (size[par[v] ?? 0] ?? 0) + (size[v] ?? 0);
	}
	const heavy = children.map((list) =>
		list.reduce(
			(best, c) => (best < 0 || (size[c] ?? 0) > (size[best] ?? 0) ? c : best),
			-1,
		),
	);
	const values = [...new Set(xor)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i + 1]));
	const m = values.length;
	const tree = new Int32Array(m + 1);
	const counts = new Int32Array(m + 1);
	const update = (i: number, delta: number): void => {
		for (; i <= m; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	let top = 1;
	while (top * 2 <= m) top *= 2;
	const kth = (k: number): number => {
		let position = 0;
		for (let step = top; step > 0; step >>= 1)
			if (position + step <= m && (tree[position + step] ?? 0) < k) {
				position += step;
				k -= tree[position] ?? 0;
			}
		return position + 1;
	};
	let present = 0;
	const change = (v: number, delta: number): void => {
		const r = rank.get(xor[v] ?? 0) ?? 0;
		const before = counts[r] ?? 0;
		counts[r] = before + delta;
		if (before === 0 && delta > 0) {
			update(r, 1);
			present++;
		} else if (before + delta === 0) {
			update(r, -1);
			present--;
		}
	};
	const changeSubtree = (v: number, delta: number): void => {
		for (let i = start[v] ?? 0; i < (start[v] ?? 0) + (size[v] ?? 0); i++)
			change(order[i] ?? 0, delta);
	};
	const asked: [k: number, index: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	queries.forEach(([u = 0, k = 0], index) => {
		asked[u]?.push([k, index]);
	});
	const answers = new Array<number>(queries.length).fill(-1);
	const frames: [v: number, keep: boolean, done: boolean][] = [
		[0, true, false],
	];
	while (frames.length > 0) {
		const [v, keep, done] = frames.pop() ?? [0, true, true];
		const big = heavy[v] ?? -1;
		if (!done) {
			frames.push([v, keep, true]);
			if (big >= 0) frames.push([big, true, false]);
			for (const child of children[v] ?? [])
				if (child !== big) frames.push([child, false, false]);
			continue;
		}
		change(v, 1);
		for (const child of children[v] ?? [])
			if (child !== big) changeSubtree(child, 1);
		for (const [k, index] of asked[v] ?? [])
			if (k <= present) answers[index] = values[kth(k) - 1] ?? -1;
		if (!keep) changeSubtree(v, -1);
	}
	return answers;
};
