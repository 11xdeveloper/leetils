/**
 * 2322. Minimum Score After Removals on a Tree
 *
 * Removing two edges splits the tree into three parts; the score is the
 * largest part XOR minus the smallest. Returns the lowest score.
 *
 * Root the tree and compute subtree XORs and entry/exit times. Removing
 * the edges above nodes `u` and `v` leaves parts that depend on whether
 * one subtree contains the other; try every pair.
 *
 * @see https://leetcode.com/problems/minimum-score-after-removals-on-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumScoreAfterRemovalsOnATree([1, 5, 5, 4, 11], [[0, 1], [1, 2], [1, 3], [3, 4]]); // 9
 */
export const minimumScoreAfterRemovalsOnATree = (
	nums: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const xor = [...nums];
	const [enter, exit] = [
		new Array<number>(n).fill(0),
		new Array<number>(n).fill(0),
	];
	const parent = new Array<number>(n).fill(-1);
	let clock = 0;
	const stack: [node: number, visited: boolean][] = [[0, false]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, visited] = entry;
		if (visited) {
			exit[node] = clock;
			const p = parent[node] ?? -1;
			if (p !== -1) xor[p] = (xor[p] ?? 0) ^ (xor[node] ?? 0);
			continue;
		}
		enter[node] = clock++;
		stack.push([node, true]);
		for (const next of neighbours[node] ?? []) {
			if (next === parent[node]) continue;
			parent[next] = node;
			stack.push([next, false]);
		}
	}
	const contains = (a: number, b: number): boolean =>
		(enter[a] ?? 0) <= (enter[b] ?? 0) && (exit[b] ?? 0) <= (exit[a] ?? 0);

	const total = xor[0] ?? 0;
	let best = Infinity;
	for (let u = 1; u < n; u++) {
		for (let v = u + 1; v < n; v++) {
			const [xu, xv] = [xor[u] ?? 0, xor[v] ?? 0];
			const parts = contains(u, v)
				? [xv, xu ^ xv, total ^ xu]
				: contains(v, u)
					? [xu, xv ^ xu, total ^ xv]
					: [xu, xv, total ^ xu ^ xv];
			best = Math.min(best, Math.max(...parts) - Math.min(...parts));
		}
	}
	return best;
};
