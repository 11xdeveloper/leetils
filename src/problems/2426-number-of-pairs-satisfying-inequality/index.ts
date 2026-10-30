/**
 * 2426. Number of Pairs Satisfying Inequality
 *
 * Counts the pairs `i < j` with
 * `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff`.
 *
 * With `d = nums1 - nums2`, that is `d[i] <= d[j] + diff`: count earlier
 * values at most `d[j] + diff` with a Fenwick tree over the value range.
 *
 * @see https://leetcode.com/problems/number-of-pairs-satisfying-inequality/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(V)
 *
 * @example
 * numberOfPairsSatisfyingInequality([3, 2, 5], [2, 2, 1], 1); // 3
 */
export const numberOfPairsSatisfyingInequality = (
	nums1: readonly number[],
	nums2: readonly number[],
	diff: number,
): number => {
	const d = nums1.map((a, i) => a - (nums2[i] ?? 0));
	const low = Math.min(...d, ...d.map((v) => v + diff));
	const high = Math.max(...d, ...d.map((v) => v + diff));
	const size = high - low + 2;
	const tree = new Array<number>(size + 1).fill(0);
	let pairs = 0;
	for (const value of d) {
		for (let i = value + diff - low + 1; i > 0; i -= i & -i)
			pairs += tree[i] ?? 0;
		for (let i = value - low + 1; i <= size; i += i & -i)
			tree[i] = (tree[i] ?? 0) + 1;
	}
	return pairs;
};
