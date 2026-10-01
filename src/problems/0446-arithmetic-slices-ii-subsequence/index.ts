/**
 * 446. Arithmetic Slices II - Subsequence
 *
 * Returns how many subsequences of `nums` (at least three elements) are
 * arithmetic: every pair of neighbours has the same difference.
 *
 * For each index and difference, counts the arithmetic subsequences of at
 * least two elements ending there. Extending those that end at `j` with
 * `nums[i]` (same difference) turns each into one of at least three
 * elements, which is added to the answer.
 *
 * @see https://leetcode.com/problems/arithmetic-slices-ii-subsequence/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * arithmeticSlicesIISubsequence([2, 4, 6, 8, 10]); // 7
 */
export const arithmeticSlicesIISubsequence = (
	nums: readonly number[],
): number => {
	const ending: Map<number, number>[] = nums.map(() => new Map());
	let total = 0;

	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			const difference = (nums[i] ?? 0) - (nums[j] ?? 0);
			const fromJ = ending[j]?.get(difference) ?? 0;
			total += fromJ;
			ending[i]?.set(difference, (ending[i]?.get(difference) ?? 0) + fromJ + 1);
		}
	}

	return total;
};
