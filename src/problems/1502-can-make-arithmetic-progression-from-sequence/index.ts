/**
 * 1502. Can Make Arithmetic Progression From Sequence
 *
 * Returns whether `arr` can be rearranged so that neighbouring elements all
 * differ by the same amount.
 *
 * The only candidate is sorted order; check its gaps are equal.
 *
 * @see https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * canMakeArithmeticProgressionFromSequence([3, 5, 1]); // true
 */
export const canMakeArithmeticProgressionFromSequence = (
	arr: readonly number[],
): boolean => {
	const sorted = arr.toSorted((a, b) => a - b);
	const step = (sorted[1] ?? 0) - (sorted[0] ?? 0);
	return sorted.every(
		(value, i) => i === 0 || value - (sorted[i - 1] ?? 0) === step,
	);
};
