/**
 * 893. Groups of Special-Equivalent Strings
 *
 * A move swaps two letters at even indices or two at odd indices. Strings
 * are special-equivalent if moves can turn one into the other. Returns how
 * many groups of special-equivalent strings `words` forms.
 *
 * Moves can arrange the even-indexed letters and the odd-indexed letters
 * in any order, so a string's group is determined by those two multisets:
 * sorted, they make a key.
 *
 * @see https://leetcode.com/problems/groups-of-special-equivalent-strings/
 * @difficulty Medium
 * @timeComplexity O(n · L log L)
 * @spaceComplexity O(n · L)
 *
 * @example
 * groupsOfSpecialEquivalentStrings(["abcd", "cdab", "cbad", "xyzz", "zzxy", "zzyx"]); // 3
 */
export const groupsOfSpecialEquivalentStrings = (
	words: readonly string[],
): number => {
	const key = (word: string): string => {
		const letters = [...word];
		const even = letters
			.filter((_, i) => i % 2 === 0)
			.sort()
			.join("");
		const odd = letters
			.filter((_, i) => i % 2 === 1)
			.sort()
			.join("");
		return `${even}|${odd}`;
	};
	return new Set(words.map(key)).size;
};
