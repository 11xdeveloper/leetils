/**
 * 2519. Count the Number of K-Big Indices
 *
 * An index is k-big if at least `k` earlier and at least `k` later
 * indices hold smaller values. Returns the number of k-big indices.
 *
 * Sweep left to right and then right to left with a Fenwick tree over
 * values, counting the smaller values already seen on each side.
 *
 * @see https://leetcode.com/problems/count-the-number-of-k-big-indices/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfKBigIndices([2, 3, 6, 5, 2, 3], 2); // 2
 */
export const countTheNumberOfKBigIndices = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const smallerOnSide = (indices: Iterable<number>): number[] => {
		const tree = Array.from({ length: n + 1 }, () => 0);
		const counts = nums.map(() => 0);
		for (const i of indices) {
			const value = nums[i] ?? 1;
			let smaller = 0;
			for (let j = value - 1; j > 0; j -= j & -j) smaller += tree[j] ?? 0;
			counts[i] = smaller;
			for (let j = value; j <= n; j += j & -j) tree[j] = (tree[j] ?? 0) + 1;
		}
		return counts;
	};
	const forward = [...nums.keys()];
	const before = smallerOnSide(forward);
	const after = smallerOnSide(forward.toReversed());
	return nums.filter((_, i) => (before[i] ?? 0) >= k && (after[i] ?? 0) >= k)
		.length;
};
