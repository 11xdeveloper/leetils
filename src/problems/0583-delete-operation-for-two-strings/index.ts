/**
 * 583. Delete Operation for Two Strings
 *
 * Returns the fewest single-character deletions, from either string, that
 * make `word1` and `word2` equal.
 *
 * What's left is a common subsequence, so the fewest deletions keep a
 * longest common subsequence: `m + n - 2 · LCS`. The LCS DP keeps one row.
 *
 * @see https://leetcode.com/problems/delete-operation-for-two-strings/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * deleteOperationForTwoStrings("sea", "eat"); // 2
 */
export const deleteOperationForTwoStrings = (
	word1: string,
	word2: string,
): number => {
	let previous = new Array<number>(word2.length + 1).fill(0);
	for (const char of word1) {
		const current = [0];
		for (let j = 1; j <= word2.length; j++) {
			current[j] =
				char === word2.charAt(j - 1)
					? (previous[j - 1] ?? 0) + 1
					: Math.max(previous[j] ?? 0, current[j - 1] ?? 0);
		}
		previous = current;
	}
	return word1.length + word2.length - 2 * (previous[word2.length] ?? 0);
};
