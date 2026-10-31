/**
 * 2598. Smallest Missing Non-negative Integer After Operations
 *
 * Any element may have `value` added or subtracted any number of times.
 * Returns the largest possible MEX, the smallest missing non-negative
 * integer.
 *
 * Elements only keep their residue modulo `value`. Count the residues,
 * then hand them out to 0, 1, 2, … until one runs out.
 *
 * @see https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations/
 * @difficulty Medium
 * @timeComplexity O(n + value)
 * @spaceComplexity O(value)
 *
 * @example
 * smallestMissingNonNegativeIntegerAfterOperations([1, -10, 7, 13, 6, 8], 5); // 4
 */
export const smallestMissingNonNegativeIntegerAfterOperations = (
	nums: readonly number[],
	value: number,
): number => {
	const counts = Array.from({ length: value }, () => 0);
	for (const num of nums) {
		const residue = ((num % value) + value) % value;
		counts[residue] = (counts[residue] ?? 0) + 1;
	}
	let mex = 0;
	while ((counts[mex % value] ?? 0) > 0) {
		counts[mex % value] = (counts[mex % value] ?? 0) - 1;
		mex++;
	}
	return mex;
};
