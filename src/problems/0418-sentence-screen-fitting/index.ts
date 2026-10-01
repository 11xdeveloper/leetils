/**
 * 418. Sentence Screen Fitting
 *
 * Returns how many times `sentence` fits on a `rows`×`cols` screen, typed
 * repeatedly in order, with words never split across lines and single spaces
 * between words on a line.
 *
 * Joins the sentence into one string with a space after every word, and
 * tracks a position in that string repeated forever. Each row advances the
 * position by `cols`; if that lands mid-word, it backs up to the start of
 * the word, which moves to the next row. Dividing the final position by
 * the string's length counts the full sentences.
 *
 * @see https://leetcode.com/problems/sentence-screen-fitting/
 * @difficulty Medium
 * @timeComplexity O(rows * w) where w is the length of the longest word
 * @spaceComplexity O(total length of the sentence)
 *
 * @example
 * sentenceScreenFitting(["a", "bcd", "e"], 3, 6); // 2
 */
export const sentenceScreenFitting = (
	sentence: readonly string[],
	rows: number,
	cols: number,
): number => {
	const text = `${sentence.join(" ")} `;
	const length = text.length;
	let position = 0;

	for (let row = 0; row < rows; row++) {
		position += cols;
		if (text[position % length] === " ") {
			position++;
		} else {
			while (position > 0 && text[(position - 1) % length] !== " ") position--;
		}
	}

	return Math.floor(position / length);
};
