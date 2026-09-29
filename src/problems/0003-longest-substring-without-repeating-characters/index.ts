/**
 * 3. Longest Substring Without Repeating Characters
 *
 * Returns the length of the longest substring of `s` in which no character
 * repeats.
 *
 * Slides a window over `s`, remembering where each character was last seen.
 * When a character repeats inside the window, the window's start jumps past
 * its previous occurrence.
 *
 * @see https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(min(n, k)) where k is the size of the character set
 *
 * @example
 * longestSubstringWithoutRepeatingCharacters("abcabcbb"); // 3 ("abc")
 */
export const longestSubstringWithoutRepeatingCharacters = (
	s: string,
): number => {
	const lastSeen = new Map<string, number>();
	let start = 0;
	let longest = 0;

	for (let end = 0; end < s.length; end++) {
		const char = s.charAt(end);
		const previous = lastSeen.get(char);
		if (previous !== undefined && previous >= start) start = previous + 1;

		lastSeen.set(char, end);
		longest = Math.max(longest, end - start + 1);
	}

	return longest;
};
