/** The interface LeetCode provides: `guess` returns how many letters of the word match the secret in place. */
interface Master {
	guess(word: string): number;
}

/**
 * 843. Guess the Word
 *
 * One of `words` (distinct, six letters each) is secret. Each call to
 * `master.guess(word)` reports how many positions `word` shares with the
 * secret. Finds the secret, i.e. guesses it, within the allowed number of
 * guesses (10 for LeetCode's tests).
 *
 * Minimax: it guesses the candidate whose worst-case answer leaves the
 * fewest candidates, then keeps only the candidates consistent with the
 * answer it got.
 *
 * @see https://leetcode.com/problems/guess-the-word/
 * @difficulty Hard
 * @timeComplexity O(g · n^2) for g guesses and n words
 * @spaceComplexity O(n)
 *
 * @example
 * guessTheWord(["acckzz", "ccbazz", "eiowzz", "abcczz"], master); // guesses until master sees "acckzz"
 */
export const guessTheWord = (
	words: readonly string[],
	master: Master,
): void => {
	const matches = (a: string, b: string): number => {
		let count = 0;
		for (let i = 0; i < a.length; i++) if (a.charAt(i) === b.charAt(i)) count++;
		return count;
	};

	let candidates = [...words];
	while (candidates.length > 0) {
		let guess = candidates[0] ?? "";
		let bestWorst = Number.POSITIVE_INFINITY;
		for (const word of candidates) {
			const groups = new Array<number>(word.length + 1).fill(0);
			for (const other of candidates)
				groups[matches(word, other)] = (groups[matches(word, other)] ?? 0) + 1;
			const worst = Math.max(...groups.slice(0, word.length));
			if (worst < bestWorst) {
				bestWorst = worst;
				guess = word;
			}
		}

		const result = master.guess(guess);
		if (result === guess.length) return;
		candidates = candidates.filter(
			(word) => word !== guess && matches(word, guess) === result,
		);
	}
};
