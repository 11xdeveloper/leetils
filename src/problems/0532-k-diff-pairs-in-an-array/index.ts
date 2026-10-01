/**
 * 532. K-diff Pairs in an Array
 *
 * Counts the distinct pairs of values `(a, b)` from `nums` (at different
 * indices) with `b - a = k`, where `k ≥ 0`.
 *
 * Counts each value's occurrences. For `k = 0`, a pair is a value appearing
 * at least twice; otherwise it's a value `v` such that `v + k` also appears.
 *
 * @see https://leetcode.com/problems/k-diff-pairs-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * kDiffPairsInAnArray([3, 1, 4, 1, 5], 2); // 2: (1, 3) and (3, 5)
 */
export const kDiffPairsInAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

	let pairs = 0;
	for (const [value, count] of counts) {
		if (k === 0 ? count >= 2 : counts.has(value + k)) pairs++;
	}
	return pairs;
};
