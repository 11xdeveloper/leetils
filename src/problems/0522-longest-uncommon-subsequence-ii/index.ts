/**
 * 522. Longest Uncommon Subsequence II
 *
 * Returns the length of the longest string that is a subsequence of one
 * string in `strs` but of no other, or -1 if there's none.
 *
 * If some subsequence of `s` is uncommon, so is `s` itself, since anything
 * containing `s` contains its subsequences. So only whole strings need
 * checking: the answer is the longest string that isn't a subsequence of
 * any other string in the list.
 *
 * @see https://leetcode.com/problems/longest-uncommon-subsequence-ii/
 * @difficulty Medium
 * @timeComplexity O(n^2 · L) for n strings of length up to L
 * @spaceComplexity O(1)
 *
 * @example
 * longestUncommonSubsequenceII(["aba", "cdc", "eae"]); // 3
 */
export const longestUncommonSubsequenceII = (
	strs: readonly string[],
): number => {
	const isSubsequence = (short: string, long: string): boolean => {
		let i = 0;
		for (const char of long)
			if (i < short.length && char === short.charAt(i)) i++;
		return i === short.length;
	};

	let longest = -1;
	for (const [i, str] of strs.entries()) {
		if (str.length <= longest) continue;
		if (strs.every((other, j) => i === j || !isSubsequence(str, other)))
			longest = str.length;
	}
	return longest;
};
