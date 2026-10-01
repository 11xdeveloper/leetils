/**
 * 1963. Minimum Number of Swaps to Make the String Balanced
 *
 * `s` has equally many `[` and `]`. Returns the fewest swaps of any two
 * characters making the brackets balanced.
 *
 * After cancelling matched pairs, `]]]…[[[` remains with `m` of each; each
 * swap fixes two pairs, so it takes `⌈m / 2⌉`.
 *
 * @see https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfSwapsToMakeTheStringBalanced("]]][[["); // 2
 */
export const minimumNumberOfSwapsToMakeTheStringBalanced = (
	s: string,
): number => {
	let [open, unmatched] = [0, 0];
	for (const char of s) {
		if (char === "[") open++;
		else if (open > 0) open--;
		else unmatched++;
	}
	return Math.ceil(unmatched / 2);
};
