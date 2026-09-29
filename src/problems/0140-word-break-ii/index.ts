/**
 * 140. Word Break II
 *
 * Returns every way to split `s` into a sentence of words from `wordDict`,
 * with the words separated by single spaces. Words can be reused.
 *
 * Memoized search over suffixes: the sentences for a suffix are each word
 * that starts it, followed by each sentence for what comes after that word.
 * Each suffix's sentences are built once, however many ways it's reached.
 *
 * @see https://leetcode.com/problems/word-break-ii/
 * @difficulty Hard
 * @timeComplexity O(n^2 + S) where S is the total length of the returned sentences
 * @spaceComplexity O(n + S)
 *
 * @example
 * wordBreakII("catsanddog", ["cat", "cats", "and", "sand", "dog"]); // ["cat sand dog", "cats and dog"]
 */
export const wordBreakII = (
	s: string,
	wordDict: readonly string[],
): string[] => {
	const words = new Set(wordDict);
	const memo = new Map<number, string[]>();

	const sentencesFrom = (start: number): string[] => {
		if (start === s.length) return [""];
		const cached = memo.get(start);
		if (cached) return cached;

		const sentences: string[] = [];
		for (let end = start + 1; end <= s.length; end++) {
			const word = s.slice(start, end);
			if (!words.has(word)) continue;
			for (const rest of sentencesFrom(end)) {
				sentences.push(rest === "" ? word : `${word} ${rest}`);
			}
		}

		memo.set(start, sentences);
		return sentences;
	};

	return sentencesFrom(0);
};
