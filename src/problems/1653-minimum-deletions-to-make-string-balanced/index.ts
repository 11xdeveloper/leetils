/**
 * 1653. Minimum Deletions to Make String Balanced
 *
 * Returns the fewest deletions from the `a`/`b` string `s` leaving no `b`
 * before an `a`.
 *
 * Scanning left to right, the cost to balance a prefix either deletes the
 * new `a` (one more than the previous cost) or deletes every `b` so far.
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionsToMakeStringBalanced("aababbab"); // 2
 */
export const minimumDeletionsToMakeStringBalanced = (s: string): number => {
	let [deletions, bs] = [0, 0];
	for (const char of s) {
		if (char === "b") bs++;
		else deletions = Math.min(deletions + 1, bs);
	}
	return deletions;
};
