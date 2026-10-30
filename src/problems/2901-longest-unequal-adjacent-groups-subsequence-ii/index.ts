/**
 * 2901. Longest Unequal Adjacent Groups Subsequence II
 *
 * Returns a longest subsequence of words in which neighbours belong to
 * different groups and are equal-length words differing in exactly one
 * letter.
 *
 * Longest-path DP over indices, remembering each one's predecessor to
 * rebuild the answer.
 *
 * @see https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii/
 * @difficulty Medium
 * @timeComplexity O(n² · L), where `L` is the word length
 * @spaceComplexity O(n)
 *
 * @example
 * longestUnequalAdjacentGroupsSubsequenceII(["a", "b", "c", "d"], [1, 2, 3, 4]); // ["a", "b", "c", "d"]
 */
export const longestUnequalAdjacentGroupsSubsequenceII = (
	words: readonly string[],
	groups: readonly number[],
): string[] => {
	const oneApart = (a: string, b: string): boolean => {
		if (a.length !== b.length) return false;
		let differences = 0;
		for (let i = 0; i < a.length && differences < 2; i++)
			if (a.charAt(i) !== b.charAt(i)) differences++;
		return differences === 1;
	};
	const length = words.map(() => 1);
	const previous = words.map(() => -1);
	let end = 0;
	for (let i = 0; i < words.length; i++) {
		for (let j = 0; j < i; j++)
			if (
				groups[i] !== groups[j] &&
				(length[j] ?? 0) + 1 > (length[i] ?? 0) &&
				oneApart(words[i] ?? "", words[j] ?? "")
			) {
				length[i] = (length[j] ?? 0) + 1;
				previous[i] = j;
			}
		if ((length[i] ?? 0) > (length[end] ?? 0)) end = i;
	}
	const chain: string[] = [];
	for (let i = words.length > 0 ? end : -1; i !== -1; i = previous[i] ?? -1)
		chain.push(words[i] ?? "");
	return chain.reverse();
};
