/**
 * 424. Longest Repeating Character Replacement
 *
 * Returns the length of the longest substring of `s` (uppercase letters)
 * that can be made of one repeated letter by replacing at most `k`
 * characters.
 *
 * Slides a window, tracking the most frequent letter's count seen in it.
 * The window is valid while its length minus that count is at most `k`.
 * When it isn't, the window slides instead of shrinking: the answer only
 * grows when a letter's count beats the previous best, so the best count
 * never needs lowering.
 *
 * @see https://leetcode.com/problems/longest-repeating-character-replacement/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * longestRepeatingCharacterReplacement("AABABBA", 1); // 4
 */
export const longestRepeatingCharacterReplacement = (
	s: string,
	k: number,
): number => {
	const counts = new Map<string, number>();
	let mostFrequent = 0;
	let left = 0;

	for (let right = 0; right < s.length; right++) {
		const char = s.charAt(right);
		const count = (counts.get(char) ?? 0) + 1;
		counts.set(char, count);
		mostFrequent = Math.max(mostFrequent, count);

		if (right - left + 1 - mostFrequent > k) {
			const leftChar = s.charAt(left);
			counts.set(leftChar, (counts.get(leftChar) ?? 1) - 1);
			left++;
		}
	}

	return s.length - left;
};
