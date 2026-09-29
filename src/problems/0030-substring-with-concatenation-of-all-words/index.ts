/**
 * 30. Substring with Concatenation of All Words
 *
 * Returns, in ascending order, the start index of every substring of `s` that
 * is all of `words` joined together in any order. Every word has the same
 * length.
 *
 * Splits `s` into word-sized chunks from each possible offset, then slides a
 * window of chunks along it, tracking how often each word appears. The window
 * shrinks from the left when a word appears too often, and restarts after a
 * chunk that isn't one of the words.
 *
 * @see https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 * @difficulty Hard
 * @timeComplexity O(n * w) where w is the length of each word
 * @spaceComplexity O(m * w) where m is the number of words
 *
 * @example
 * substringWithConcatenationOfAllWords("barfoothefoobarman", ["foo", "bar"]); // [0, 9]
 */
export const substringWithConcatenationOfAllWords = (
	s: string,
	words: readonly string[],
): number[] => {
	const wordLength = words[0]?.length ?? 0;
	const needed = new Map<string, number>();
	for (const word of words) needed.set(word, (needed.get(word) ?? 0) + 1);

	const starts: number[] = [];

	for (let offset = 0; offset < wordLength; offset++) {
		const inWindow = new Map<string, number>();
		let count = 0;
		let left = offset;

		const dropLeftWord = (): void => {
			const word = s.slice(left, left + wordLength);
			inWindow.set(word, (inWindow.get(word) ?? 0) - 1);
			count--;
			left += wordLength;
		};

		for (
			let right = offset;
			right + wordLength <= s.length;
			right += wordLength
		) {
			const word = s.slice(right, right + wordLength);
			const limit = needed.get(word);

			if (limit === undefined) {
				inWindow.clear();
				count = 0;
				left = right + wordLength;
				continue;
			}

			inWindow.set(word, (inWindow.get(word) ?? 0) + 1);
			count++;
			while ((inWindow.get(word) ?? 0) > limit) dropLeftWord();

			if (count === words.length) {
				starts.push(left);
				dropLeftWord();
			}
		}
	}

	return starts.toSorted((a, b) => a - b);
};
