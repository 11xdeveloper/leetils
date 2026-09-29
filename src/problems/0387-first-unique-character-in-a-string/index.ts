/**
 * 387. First Unique Character in a String
 *
 * Returns the index of the first character in `s` that appears only once,
 * or -1 if every character repeats.
 *
 * Counts every character, then returns the first index whose character's
 * count is 1.
 *
 * @see https://leetcode.com/problems/first-unique-character-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * firstUniqueCharacterInAString("loveleetcode"); // 2
 */
export const firstUniqueCharacterInAString = (s: string): number => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	return [...s].findIndex((char) => counts.get(char) === 1);
};
