/**
 * 3460. Longest Common Prefix After at Most One Removal
 *
 * The longest common prefix of `s` and `t` after removing at most one
 * character from `s`.
 *
 * Match the strings with two pointers, skipping one mismatched character of
 * `s` the first time they disagree.
 *
 * @see https://leetcode.com/problems/longest-common-prefix-after-at-most-one-removal/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * longestCommonPrefixAfterAtMostOneRemoval("madxa", "madam"); // 4
 */
export const longestCommonPrefixAfterAtMostOneRemoval = (
	s: string,
	t: string,
): number => {
	let i = 0;
	let j = 0;
	let removed = false;
	while (i < s.length && j < t.length)
		if (s[i] === t[j]) {
			i++;
			j++;
		} else if (!removed) {
			removed = true;
			i++;
		} else break;
	return j;
};
