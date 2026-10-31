const MOD = 1_000_000_007;

/**
 * 3165. Maximum Sum of Subsequence With Non-adjacent Elements
 *
 * Each query `[pos, x]` sets `nums[pos] = x`, then asks for the largest sum
 * of a subsequence with no two neighbours (possibly empty). Returns the sum
 * of the answers, modulo 10⁹ + 7.
 *
 * A segment tree whose nodes store the best sum for each combination of
 * "may the first element be taken" and "may the last element be taken".
 * Joining two halves, at most one side of the seam can be taken.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfSubsequenceWithNonAdjacentElements([3, 5, 9], [[1, -2], [0, -3]]); // 21
 */
export const maximumSumOfSubsequenceWithNonAdjacentElements = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	let size = 1;
	while (size < nums.length) size *= 2;
	// Four values per node: [neither end, last only, first only, both] may be taken.
	const tree = new Float64Array(8 * size);
	const setLeaf = (i: number, value: number): void => {
		const at = 4 * (size + i);
		tree[at + 3] = Math.max(0, value);
	};
	const pull = (node: number): void => {
		const l = 8 * node;
		const r = 8 * node + 4;
		const at = 4 * node;
		for (let first = 0; first < 2; first++)
			for (let last = 0; last < 2; last++)
				tree[at + 2 * first + last] = Math.max(
					(tree[l + 2 * first] ?? 0) + (tree[r + 2 + last] ?? 0),
					(tree[l + 2 * first + 1] ?? 0) + (tree[r + last] ?? 0),
				);
	};
	nums.forEach((num, i) => {
		setLeaf(i, num);
	});
	for (let node = size - 1; node > 0; node--) pull(node);
	let total = 0;
	for (const [pos = 0, x = 0] of queries) {
		setLeaf(pos, x);
		for (let node = (size + pos) >> 1; node > 0; node >>= 1) pull(node);
		total = (total + (tree[4 + 3] ?? 0)) % MOD;
	}
	return total;
};
