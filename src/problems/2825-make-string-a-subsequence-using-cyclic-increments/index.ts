/**
 * 2825. Make String a Subsequence Using Cyclic Increments
 *
 * Once, you may advance any set of `str1`'s letters to the next letter,
 * `z` wrapping to `a`. Returns whether `str2` can then be a subsequence
 * of `str1`.
 *
 * Greedily match `str2` against `str1`, letting each letter match itself
 * or its successor.
 *
 * @see https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * makeStringASubsequenceUsingCyclicIncrements("zc", "ad"); // true
 */
export const makeStringASubsequenceUsingCyclicIncrements = (
	str1: string,
	str2: string,
): boolean => {
	let matched = 0;
	for (let i = 0; i < str1.length && matched < str2.length; i++) {
		const have = str1.charCodeAt(i) - 97;
		const want = str2.charCodeAt(matched) - 97;
		if (have === want || (have + 1) % 26 === want) matched++;
	}
	return matched === str2.length;
};
