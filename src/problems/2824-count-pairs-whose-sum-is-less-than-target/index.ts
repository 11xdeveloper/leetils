/**
 * 2824. Count Pairs Whose Sum is Less than Target
 *
 * Returns the number of index pairs whose values sum to less than
 * `target`.
 *
 * Sort, then count with two pointers.
 *
 * @see https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countPairsWhoseSumIsLessThanTarget([-1, 1, 2, 3, 1], 2); // 3
 */
export const countPairsWhoseSumIsLessThanTarget = (
	nums: readonly number[],
	target: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let pairs = 0;
	for (let i = 0, j = sorted.length - 1; i < j; ) {
		if ((sorted[i] ?? 0) + (sorted[j] ?? 0) < target) {
			pairs += j - i;
			i++;
		} else j--;
	}
	return pairs;
};
