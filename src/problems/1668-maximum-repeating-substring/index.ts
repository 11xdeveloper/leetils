/**
 * 1668. Maximum Repeating Substring
 *
 * Returns the largest `k` such that `word` repeated `k` times is a
 * substring of `sequence`.
 *
 * `dp[i]` is how many copies of `word` end exactly at index `i`: one more
 * than the count ending just before this copy started, when it matches.
 *
 * @see https://leetcode.com/problems/maximum-repeating-substring/
 * @difficulty Easy
 * @timeComplexity O(n · w)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumRepeatingSubstring("ababc", "ab"); // 2
 */
export const maximumRepeatingSubstring = (
	sequence: string,
	word: string,
): number => {
	const w = word.length;
	const copies = new Array<number>(sequence.length + 1).fill(0);
	let best = 0;
	for (let end = w; end <= sequence.length; end++) {
		if (!sequence.startsWith(word, end - w)) continue;
		copies[end] = (copies[end - w] ?? 0) + 1;
		best = Math.max(best, copies[end] ?? 0);
	}
	return best;
};
