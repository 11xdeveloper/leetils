/**
 * 1876. Substrings of Size Three with Distinct Characters
 *
 * Counts the length-3 substrings of `s` with three different characters.
 *
 * Checks every window.
 *
 * @see https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * substringsOfSizeThreeWithDistinctCharacters("aababcabc"); // 4
 */
export const substringsOfSizeThreeWithDistinctCharacters = (
	s: string,
): number => {
	let count = 0;
	for (let i = 2; i < s.length; i++)
		if (s[i] !== s[i - 1] && s[i] !== s[i - 2] && s[i - 1] !== s[i - 2])
			count++;
	return count;
};
