/**
 * 340. Longest Substring with At Most K Distinct Characters
 *
 * Returns the length of the longest substring of `s` that contains at most
 * `k` distinct characters.
 *
 * Slides a window over `s`, counting the characters inside it. When more
 * than `k` distinct characters are inside, the left end moves forward until
 * one of them has left the window entirely.
 *
 * @see https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * longestSubstringWithAtMostKDistinctCharacters("eceba", 2); // 3, for "ece"
 */
export const longestSubstringWithAtMostKDistinctCharacters = (
	s: string,
	k: number,
): number => {
	const counts = new Map<string, number>();
	let left = 0;
	let longest = 0;

	for (let right = 0; right < s.length; right++) {
		const char = s.charAt(right);
		counts.set(char, (counts.get(char) ?? 0) + 1);

		while (counts.size > k) {
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
