/**
 * 3624. Number of Integers With Popcount-Depth Equal to K II
 *
 * Query `[1, l, r, k]` counts indices from l to r whose element has
 * popcount-depth k (the replacements by popcount needed to reach 1);
 * query `[2, i, val]` sets `nums[i]` to val. Returns the counts.
 *
 * Depths are at most 5 for numbers up to 1e15, so keep a Fenwick tree of
 * positions for each depth.
 *
 * @see https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfIntegersWithPopcountDepthEqualToKII([2, 4], [[1, 0, 1, 1], [2, 1, 1], [1, 0, 1, 0]]); // [2, 1]
 */
export const numberOfIntegersWithPopcountDepthEqualToKII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const popcount = (x: number): number => {
		let count = 0;
		for (let part of [x % 2 ** 32, Math.floor(x / 2 ** 32)])
			for (; part; part = Math.floor(part / 2)) count += part % 2;
		return count;
	};
	const depth = (x: number): number => {
		let steps = 0;
		for (; x !== 1; steps++) x = popcount(x);
		return steps;
	};
	const trees = Array.from({ length: 6 }, () => new Int32Array(n + 1));
	const update = (tree: Int32Array, i: number, delta: number): void => {
		for (i++; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const prefix = (tree: Int32Array, i: number): number => {
		let sum = 0;
		for (; i > 0; i -= i & -i) sum += tree[i] ?? 0;
		return sum;
	};
	const depths = nums.map(depth);
	depths.forEach((d, i) => {
		update(trees[d] as Int32Array, i, 1);
	});
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0, k = 0] of queries) {
		if (kind === 1) {
			const tree = trees[k];
			answers.push(tree ? prefix(tree, b + 1) - prefix(tree, a) : 0);
			continue;
		}
		update(trees[depths[a] ?? 0] as Int32Array, a, -1);
		depths[a] = depth(b);
		update(trees[depths[a] ?? 0] as Int32Array, a, 1);
	}
	return answers;
};
