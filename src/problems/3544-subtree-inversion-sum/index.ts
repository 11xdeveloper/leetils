/**
 * 3544. Subtree Inversion Sum
 *
 * In a tree rooted at 0, inverting a node negates every value in its
 * subtree. Any two inverted nodes on one root path must be at least `k`
 * apart. Returns the largest possible sum of the values.
 *
 * Dynamic programming from the leaves up over (node, distance to the
 * nearest inverted ancestor capped at k, whether an odd number of
 * ancestors are inverted): a node may be inverted only once that distance
 * has reached k.
 *
 * @see https://leetcode.com/problems/subtree-inversion-sum/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * subtreeInversionSum([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]], [4, -8, -6, 3, 7, -2, 5], 2); // 27
 */
export const subtreeInversionSum = (
	edges: readonly (readonly number[])[],
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	parent[0] = 0;
	const order = [0];
	for (let i = 0; i < order.length; i++)
		for (const next of adjacent[order[i] ?? 0] ?? [])
			if (parent[next] === -1) {
				parent[next] = order[i] ?? 0;
				order.push(next);
			}
	const width = (k + 1) * 2;
	const at = (node: number, distance: number, odd: number): number =>
		node * width + distance * 2 + odd;
	// best[at(v, d, o)]: best sum of v's subtree with nearest inverted ancestor d away (capped) and parity o.
	const best = new Float64Array(n * width);
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let i = 1; i < n; i++)
		children[parent[order[i] ?? 0] ?? 0]?.push(order[i] ?? 0);
	for (let i = n - 1; i >= 0; i--) {
		const node = order[i] ?? 0;
		for (let d = 1; d <= k; d++)
			for (let odd = 0; odd < 2; odd++) {
				const deeper = Math.min(k, d + 1);
				let keep = (odd ? -1 : 1) * (nums[node] ?? 0);
				for (const child of children[node] ?? [])
					keep += best[at(child, deeper, odd)] ?? 0;
				let value = keep;
				if (d === k) {
					let invert = (odd ? 1 : -1) * (nums[node] ?? 0);
					for (const child of children[node] ?? [])
						invert += best[at(child, 1, 1 - odd)] ?? 0;
					value = Math.max(value, invert);
				}
				best[at(node, d, odd)] = value;
			}
	}
	return best[at(0, k, 0)] ?? 0;
};
