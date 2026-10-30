/**
 * 2765. Longest Alternating Subarray
 *
 * An alternating subarray of length at least 2 goes `x, x + 1, x, x + 1,
 * …`. Returns the length of the longest one, or -1 if there is none.
 *
 * Extend a run while the differences alternate +1 and -1; on a break,
 * restart from the previous element if it begins a new +1 step.
 *
 * @see https://leetcode.com/problems/longest-alternating-subarray/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestAlternatingSubarray([2, 3, 4, 3, 4]); // 4
 */
export const longestAlternatingSubarray = (nums: readonly number[]): number => {
	let best = -1;
	let run = 1;
	for (let i = 1; i < nums.length; i++) {
		const step = (nums[i] ?? 0) - (nums[i - 1] ?? 0);
		const expected = run % 2 === 1 ? 1 : -1;
		if (run > 1 && step === expected) run++;
		else run = step === 1 ? 2 : 1;
		if (run > 1) best = Math.max(best, run);
	}
	return best;
};
