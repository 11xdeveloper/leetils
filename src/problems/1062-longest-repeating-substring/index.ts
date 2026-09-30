/**
 * 1062. Longest Repeating Substring
 *
 * Returns the length of the longest substring of `s` that occurs at least
 * twice (the occurrences may overlap), or 0 if none does.
 *
 * `common[i][j]` is the length of the longest common suffix of the prefixes
 * ending at `i` and `j` (with `i < j`); the largest such value is the
 * answer. Rows are rolled so only one is kept.
 *
 * @see https://leetcode.com/problems/longest-repeating-substring/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * longestRepeatingSubstring("aabcaabdaab"); // 3: "aab"
 */
export const longestRepeatingSubstring = (s: string): number => {
	const n = s.length;
	let previous = new Array<number>(n + 1).fill(0);
	let longest = 0;
	for (let i = 1; i <= n; i++) {
		const current = new Array<number>(n + 1).fill(0);
		for (let j = i + 1; j <= n; j++) {
			if (s.charAt(i - 1) !== s.charAt(j - 1)) continue;
			current[j] = (previous[j - 1] ?? 0) + 1;
			longest = Math.max(longest, current[j] ?? 0);
		}
		previous = current;
	}
	return longest;
};
