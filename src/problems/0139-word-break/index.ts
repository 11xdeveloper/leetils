/**
 * 139. Word Break
 *
 * Returns whether `s` can be split into a sequence of one or more words from
 * `wordDict`, where words can be reused.
 *
 * `canBreak[i]` says whether the first `i` characters can be split. Each
 * position checks the words that could end there, which is at most the
 * longest word's length back.
 *
 * @see https://leetcode.com/problems/word-break/
 * @difficulty Medium
 * @timeComplexity O(n * L) where L is the length of the longest word
 * @spaceComplexity O(n + W) where W is the total length of the words
 *
 * @example
 * wordBreak("applepenapple", ["apple", "pen"]); // true
 */
export const wordBreak = (s: string, wordDict: readonly string[]): boolean => {
	const words = new Set(wordDict);
	const longest = Math.max(0, ...wordDict.map((word) => word.length));
	const canBreak = new Array<boolean>(s.length + 1).fill(false);
	canBreak[0] = true;

	for (let end = 1; end <= s.length; end++) {
		for (let start = Math.max(0, end - longest); start < end; start++) {
			if (canBreak[start] && words.has(s.slice(start, end))) {
				canBreak[end] = true;
				break;
			}
		}
	}

	return canBreak[s.length] ?? false;
};
