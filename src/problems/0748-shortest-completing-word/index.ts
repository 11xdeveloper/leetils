/**
 * 748. Shortest Completing Word
 *
 * A word completes `licensePlate` if it contains every letter of the plate
 * (ignoring case, digits and spaces) at least as often. Returns the
 * shortest completing word in `words`, the first one on a tie.
 *
 * Counts the plate's letters once, then checks each word's letter counts
 * against them.
 *
 * @see https://leetcode.com/problems/shortest-completing-word/
 * @difficulty Easy
 * @timeComplexity O(total length of the words)
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"]); // "steps"
 */
export const shortestCompletingWord = (
	licensePlate: string,
	words: readonly string[],
): string => {
	const counts = (text: string): number[] => {
		const result = new Array<number>(26).fill(0);
		for (const char of text.toLowerCase()) {
			const letter = char.charCodeAt(0) - 97;
			if (letter >= 0 && letter < 26)
				result[letter] = (result[letter] ?? 0) + 1;
		}
		return result;
	};
	const needed = counts(licensePlate);

	let best: string | undefined;
	for (const word of words) {
		if (best !== undefined && word.length >= best.length) continue;
		const have = counts(word);
		if (needed.every((count, letter) => (have[letter] ?? 0) >= count))
			best = word;
	}
	return best ?? "";
};
