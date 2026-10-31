/**
 * 3302. Find the Lexicographically Smallest Valid Sequence
 *
 * The lexicographically smallest increasing list of indices into `word1`
 * whose letters spell `word2` with at most one letter changed, or an empty
 * list if there's none.
 *
 * Precompute, for each position, how much of `word2`'s tail can be matched
 * exactly from there onwards. Then go left to right taking every index that
 * matches the next letter, and spend the one change on the first mismatch
 * where the rest of `word2` can still be matched exactly afterwards.
 *
 * @see https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLexicographicallySmallestValidSequence("vbcca", "abc"); // [0, 1, 2]
 */
export const findTheLexicographicallySmallestValidSequence = (
	word1: string,
	word2: string,
): number[] => {
	const n = word1.length;
	const m = word2.length;
	// tail[i]: the longest suffix of word2 that's a subsequence of word1[i..].
	const tail = new Int32Array(n + 1);
	for (let i = n - 1, matched = 0; i >= 0; i--) {
		if (matched < m && word1[i] === word2[m - 1 - matched]) matched++;
		tail[i] = matched;
	}
	const result: number[] = [];
	let changed = false;
	for (let i = 0; i < n && result.length < m; i++) {
		const j = result.length;
		if (word1[i] === word2[j]) result.push(i);
		else if (!changed && (tail[i + 1] ?? 0) >= m - j - 1) {
			result.push(i);
			changed = true;
		}
	}
	return result.length === m ? result : [];
};
