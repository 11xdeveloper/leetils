/**
 * 2179. Count Good Triplets in an Array
 *
 * Counts the triplets of values that appear in the same order in both
 * permutations `nums1` and `nums2` of `0..n-1`.
 *
 * Relabel `nums1` by each value's position in `nums2`; good triplets are
 * then increasing triplets. For each middle element, multiply the smaller
 * labels before it (counted with a Fenwick tree) by the larger after it.
 *
 * @see https://leetcode.com/problems/count-good-triplets-in-an-array/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countGoodTripletsInAnArray([2, 0, 1, 3], [0, 1, 2, 3]); // 1
 */
export const countGoodTripletsInAnArray = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums1.length;
	const position = new Array<number>(n).fill(0);
	for (const [i, value] of nums2.entries()) position[value] = i;
	const tree = new Array<number>(n + 1).fill(0);
	let triplets = 0;
	for (const [i, value] of nums1.entries()) {
		const label = position[value] ?? 0;
		let smallerBefore = 0;
		for (let j = label; j > 0; j -= j & -j) smallerBefore += tree[j] ?? 0;
		// Of the n - 1 - label larger labels, those not before i come after it.
		const largerAfter = n - 1 - label - (i - smallerBefore);
		triplets += smallerBefore * largerAfter;
		for (let j = label + 1; j <= n; j += j & -j) tree[j] = (tree[j] ?? 0) + 1;
	}
	return triplets;
};
