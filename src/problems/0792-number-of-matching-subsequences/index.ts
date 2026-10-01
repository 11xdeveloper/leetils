/**
 * 792. Number of Matching Subsequences
 *
 * Counts how many of `words` are subsequences of `s`.
 *
 * Scans `s` once, with every word waiting in a bucket for its next needed
 * character. Each character of `s` advances the words waiting for it, and a
 * word that runs out of characters is a match.
 *
 * @see https://leetcode.com/problems/number-of-matching-subsequences/
 * @difficulty Medium
 * @timeComplexity O(n + total length of the words)
 * @spaceComplexity O(number of words)
 *
 * @example
 * numberOfMatchingSubsequences("abcde", ["a", "bb", "acd", "ace"]); // 3
 */
export const numberOfMatchingSubsequences = (
	s: string,
	words: readonly string[],
): number => {
	const waiting = new Map<string, [word: string, next: number][]>();
	const wait = (word: string, next: number): void => {
		const char = word.charAt(next);
		const bucket = waiting.get(char);
		if (bucket) bucket.push([word, next]);
		else waiting.set(char, [[word, next]]);
	};
	for (const word of words) wait(word, 0);

	let matches = 0;
	for (const char of s) {
		const bucket = waiting.get(char);
		if (!bucket) continue;
		waiting.delete(char);
		for (const [word, next] of bucket) {
			if (next + 1 === word.length) matches++;
			else wait(word, next + 1);
		}
	}
	return matches;
};
