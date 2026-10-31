/**
 * 3036. Number of Subarrays That Match a Pattern II
 *
 * Count the subarrays of `nums` with one more element than `pattern`
 * whose consecutive steps follow it: 1 for a rise, 0 for no change and -1
 * for a fall.
 *
 * Turn `nums` into its sequence of step signs, then count the pattern's
 * occurrences in it with KMP.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfSubarraysThatMatchAPatternII([1, 2, 3, 4, 5, 6], [1, 1]); // 4
 */
export const numberOfSubarraysThatMatchAPatternII = (
	nums: readonly number[],
	pattern: readonly number[],
): number => {
	const m = pattern.length;
	const fail = new Int32Array(m);
	for (let i = 1, length = 0; i < m; i++) {
		while (length > 0 && pattern[i] !== pattern[length])
			length = fail[length - 1] ?? 0;
		if (pattern[i] === pattern[length]) length++;
		fail[i] = length;
	}
	let count = 0;
	for (let i = 1, matched = 0; i < nums.length; i++) {
		const step = Math.sign((nums[i] ?? 0) - (nums[i - 1] ?? 0));
		while (matched > 0 && step !== pattern[matched])
			matched = fail[matched - 1] ?? 0;
		if (step === pattern[matched]) matched++;
		if (matched === m) {
			count++;
			matched = fail[matched - 1] ?? 0;
		}
	}
	return count;
};
