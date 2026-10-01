/**
 * 383. Ransom Note
 *
 * Returns whether `ransomNote` can be spelled with letters cut from
 * `magazine`, each letter used at most once.
 *
 * Counts the magazine's letters, then uses one for each letter of the note,
 * failing as soon as a letter runs out.
 *
 * @see https://leetcode.com/problems/ransom-note/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * ransomNote("aa", "aab"); // true
 */
export const ransomNote = (note: string, magazine: string): boolean => {
	const counts = new Map<string, number>();
	for (const char of magazine) counts.set(char, (counts.get(char) ?? 0) + 1);

	for (const char of note) {
		const count = counts.get(char) ?? 0;
		if (count === 0) return false;
		counts.set(char, count - 1);
	}

	return true;
};
