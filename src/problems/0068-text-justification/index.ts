/**
 * 68. Text Justification
 *
 * Lays out `words` in lines exactly `maxWidth` characters wide, fully
 * justified: as many words per line as fit, with spaces spread as evenly as
 * possible between them and any extra spaces going to the left gaps. The
 * last line, and any line with a single word, is left-justified and padded
 * with spaces on the right.
 *
 * Greedily fills each line with words, then distributes its spaces.
 *
 * @see https://leetcode.com/problems/text-justification/
 * @difficulty Hard
 * @timeComplexity O(n * maxWidth) where n is the number of words
 * @spaceComplexity O(n * maxWidth) for the returned lines
 *
 * @example
 * textJustification(["This", "is", "an", "example", "of", "text", "justification."], 16);
 * // ["This    is    an", "example  of text", "justification.  "]
 */
export const textJustification = (
	words: readonly string[],
	maxWidth: number,
): string[] => {
	const lines: string[] = [];
	let start = 0;

	while (start < words.length) {
		// Take words while they fit with at least one space between each.
		let end = start + 1;
		let lettersWidth = words[start]?.length ?? 0;
		while (
			end < words.length &&
			lettersWidth + (words[end]?.length ?? 0) + (end - start) <= maxWidth
		) {
			lettersWidth += words[end]?.length ?? 0;
			end++;
		}

		const lineWords = words.slice(start, end);
		const gaps = lineWords.length - 1;

		if (end === words.length || gaps === 0) {
			lines.push(lineWords.join(" ").padEnd(maxWidth));
		} else {
			const spaces = maxWidth - lettersWidth;
			const evenSpaces = Math.floor(spaces / gaps);
			const extraSpaces = spaces % gaps;
			lines.push(
				lineWords
					.map((word, i) =>
						i === gaps
							? word
							: word + " ".repeat(evenSpaces + (i < extraSpaces ? 1 : 0)),
					)
					.join(""),
			);
		}

		start = end;
	}

	return lines;
};
