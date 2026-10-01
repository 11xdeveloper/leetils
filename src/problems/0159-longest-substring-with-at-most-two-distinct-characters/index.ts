/**
 * 159. Longest Substring with At Most Two Distinct Characters
 *
 * Returns the length of the longest substring of `s` that contains at most
 * two distinct characters.
 *
 * Slides a window over `s`, counting the characters inside it. When a third
 * distinct character enters, the left end moves forward until one of the
 * characters has left the window entirely.
 *
 * @see https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestSubstringWithAtMostTwoDistinctCharacters("ccaabbb"); // 5, for "aabbb"
 */
export const longestSubstringWithAtMostTwoDistinctCharacters = (
	s: string,
): number => {
	const counts = new Map<string, number>();
	let left = 0;
	let longest = 0;

	for (let right = 0; right < s.length; right++) {
		const char = s.charAt(right);
		counts.set(char, (counts.get(char) ?? 0) + 1);

		while (counts.size > 2) {
			const leftChar = s.charAt(left);
			const count = (counts.get(leftChar) ?? 1) - 1;
			if (count === 0) counts.delete(leftChar);
			else counts.set(leftChar, count);
			left++;
		}

		longest = Math.max(longest, right - left + 1);
	}

	return longest;
};
