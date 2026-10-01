/**
 * 1255. Maximum Score Words Formed by Letters
 *
 * Returns the best total score of a set of distinct `words` that can be
 * spelled together from `letters` (each letter used at most once), where
 * `score[i]` is the value of the `i`th letter of the alphabet.
 *
 * Backtracking over the words (at most 14), deciding for each whether to
 * spell it with the letters left.
 *
 * @see https://leetcode.com/problems/maximum-score-words-formed-by-letters/
 * @difficulty Hard
 * @timeComplexity O(2^w · L) for w words of total length L
 * @spaceComplexity O(w)
 *
 * @example
 * maximumScoreWordsFormedByLetters(["xxxz", "ax", "bx", "cx"], ["z", "a", "b", "c", "x", "x", "x"], [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10]); // 27
 */
export const maximumScoreWordsFormedByLetters = (
	words: readonly string[],
	letters: readonly string[],
	score: readonly number[],
): number => {
	const available = new Array<number>(26).fill(0);
	for (const letter of letters) {
		const i = letter.charCodeAt(0) - 97;
		available[i] = (available[i] ?? 0) + 1;
	}
	const codes = words.map((word) =>
		[...word].map((char) => char.charCodeAt(0) - 97),
	);
	const best = (index: number): number => {
		const word = codes[index];
		if (!word) return 0;
		let most = best(index + 1);
		let [fits, value] = [true, 0];
		for (const letter of word) {
			available[letter] = (available[letter] ?? 0) - 1;
			if ((available[letter] ?? 0) < 0) fits = false;
			value += score[letter] ?? 0;
		}
		if (fits) most = Math.max(most, value + best(index + 1));
		for (const letter of word) available[letter] = (available[letter] ?? 0) + 1;
		return most;
	};
	return best(0);
};
