/**
 * 712. Minimum ASCII Delete Sum for Two Strings
 *
 * Returns the smallest total of the ASCII codes of the characters deleted
 * from `s1` and `s2` to make them equal.
 *
 * Like edit distance with only deletions, each costing its character's
 * code: matching characters are kept, otherwise the cheaper of deleting
 * from either string. Keeps one row of the table.
 *
 * @see https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAsciiDeleteSumForTwoStrings("sea", "eat"); // 231: delete "s" (115) and "t" (116)
 */
export const minimumAsciiDeleteSumForTwoStrings = (
	s1: string,
	s2: string,
): number => {
	// cost[j] is the answer for the current prefix of s1 and s2.slice(0, j).
	let cost = [0];
	for (let j = 1; j <= s2.length; j++)
		cost.push((cost[j - 1] ?? 0) + s2.charCodeAt(j - 1));

	for (let i = 1; i <= s1.length; i++) {
		const code = s1.charCodeAt(i - 1);
		const next = [(cost[0] ?? 0) + code];
		for (let j = 1; j <= s2.length; j++) {
			next[j] =
				code === s2.charCodeAt(j - 1)
					? (cost[j - 1] ?? 0)
					: Math.min(
							(cost[j] ?? 0) + code,
							(next[j - 1] ?? 0) + s2.charCodeAt(j - 1),
						);
		}
		cost = next;
	}

	return cost[s2.length] ?? 0;
};
