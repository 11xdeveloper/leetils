const MOD = 1_000_000_007;

/**
 * 3939. Count Non Adjacent Subsets in a Rooted Tree
 *
 * Counts the non-empty sets of tree nodes, no two joined by an edge,
 * whose values add up to a multiple of `k`, modulo 1e9+7.
 *
 * Tree dynamic programming: for each subtree, count sets by the sum mod k
 * and whether the subtree's root is included, merging children (a chosen
 * root needs its children left out).
 *
 * @see https://leetcode.com/problems/count-non-adjacent-subsets-in-a-rooted-tree/
 * @difficulty Hard
 * @timeComplexity O(n · k²)
 * @spaceComplexity O(n · k)
 *
 * @example
 * countNonAdjacentSubsetsInARootedTree([-1, 0, 0, 0], [2, 1, 2, 1], 3); // 2
 */
export const countNonAdjacentSubsetsInARootedTree = (
	parent: readonly number[],
	nums: readonly number[],
	k: number,
): number => {
	const n = parent.length;
	const combine = (a: number[], b: number[]): number[] => {
		const out = new Array<number>(k).fill(0);
		a.forEach((x, i) => {
			if (!x) return;
			b.forEach((y, j) => {
				if (y)
					out[(i + j) % k] = ((out[(i + j) % k] ?? 0) + ((x * y) % MOD)) % MOD;
			});
		});
		return out;
	};
	const empty = () => Array.from({ length: k }, (_, r) => (r === 0 ? 1 : 0));
	const without: number[][] = Array.from({ length: n }, empty);
	const within: number[][] = Array.from({ length: n }, (_, v) => {
		const start = new Array<number>(k).fill(0);
		start[(nums[v] ?? 0) % k] = 1;
		return start;
	});
	// Children have larger labels than their parents.
	for (let v = n - 1; v > 0; v--) {
		const p = parent[v] ?? 0;
		const either = (without[v] ?? []).map(
			(x, r) => (x + (within[v]?.[r] ?? 0)) % MOD,
		);
		without[p] = combine(without[p] ?? [], either);
		within[p] = combine(within[p] ?? [], without[v] ?? []);
	}
	return ((without[0]?.[0] ?? 0) + (within[0]?.[0] ?? 0) - 1 + MOD) % MOD;
};
