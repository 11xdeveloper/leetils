/**
 * 2423. Remove Letter To Equalize Frequency
 *
 * Returns whether removing exactly one letter of `word` leaves every
 * remaining letter equally frequent.
 *
 * Try removing each distinct letter.
 *
 * @see https://leetcode.com/problems/remove-letter-to-equalize-frequency/
 * @difficulty Easy
 * @timeComplexity O(n + 26^2)
 * @spaceComplexity O(1)
 *
 * @example
 * removeLetterToEqualizeFrequency("abcc"); // true
 */
export const removeLetterToEqualizeFrequency = (word: string): boolean => {
	const counts = new Map<string, number>();
	for (const char of word) counts.set(char, (counts.get(char) ?? 0) + 1);
	return [...counts.keys()].some((removed) => {
		const remaining = [...counts]
			.map(([char, count]) => (char === removed ? count - 1 : count))
			.filter((count) => count > 0);
		return new Set(remaining).size <= 1;
	});
};
