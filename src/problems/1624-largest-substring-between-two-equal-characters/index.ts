/**
 * 1624. Largest Substring Between Two Equal Characters
 *
 * Returns the length of the longest substring of `s` lying strictly
 * between two equal characters, or -1 if no character repeats.
 *
 * Remembers where each character first appears; every later occurrence
 * measures the gap back to it.
 *
 * @see https://leetcode.com/problems/largest-substring-between-two-equal-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * largestSubstringBetweenTwoEqualCharacters("abca"); // 2
 */
export const largestSubstringBetweenTwoEqualCharacters = (
	s: string,
): number => {
	const first = new Map<string, number>();
	let longest = -1;
	for (let i = 0; i < s.length; i++) {
		const char = s[i] ?? "";
		const start = first.get(char);
		if (start === undefined) first.set(char, i);
		else longest = Math.max(longest, i - start - 1);
	}
	return longest;
};
