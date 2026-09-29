/**
 * 395. Longest Substring with At Least K Repeating Characters
 *
 * Returns the length of the longest substring of `s` in which every
 * character appears at least `k` times.
 *
 * Solves it once for each possible number of distinct characters `u` from 1
 * to 26: a sliding window keeps at most `u` distinct characters, and
 * whenever it has exactly `u`, all appearing at least `k` times, it's a
 * candidate. Fixing `u` is what makes the window's shrinking rule
 * well-defined.
 *
 * @see https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
 * @difficulty Medium
 * @timeComplexity O(26 n)
 * @spaceComplexity O(26)
 *
 * @example
 * longestSubstringWithAtLeastKRepeatingCharacters("ababbc", 2); // 5, for "ababb"
 */
export const longestSubstringWithAtLeastKRepeatingCharacters = (
	s: string,
	k: number,
): number => {
	let longest = 0;

	for (let unique = 1; unique <= 26; unique++) {
		const counts = new Map<string, number>();
		let atLeastK = 0;
		let left = 0;
		for (let right = 0; right < s.length; right++) {
			const char = s.charAt(right);
			const count = (counts.get(char) ?? 0) + 1;
			counts.set(char, count);
			if (count === k) atLeastK++;

			while (counts.size > unique) {
				const leftChar = s.charAt(left);
				const leftCount = counts.get(leftChar) ?? 0;
				if (leftCount === k) atLeastK--;
				if (leftCount === 1) counts.delete(leftChar);
				else counts.set(leftChar, leftCount - 1);
				left++;
			}

			if (counts.size === unique && atLeastK === unique)
				longest = Math.max(longest, right - left + 1);
		}
	}

	return longest;
};
