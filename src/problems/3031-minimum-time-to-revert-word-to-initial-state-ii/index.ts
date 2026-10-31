/**
 * 3031. Minimum Time to Revert Word to Initial State II
 *
 * Each second, remove the first `k` letters of `word` and append any `k`
 * letters. Returns the fewest seconds (more than zero) before `word` can be
 * back to how it started.
 *
 * After t seconds, the letters from `t · k` on are what remains of the
 * original, and the appended ones can be anything. So the word can be
 * restored once that remainder is a prefix of the word, or once nothing is
 * left. The Z-function gives the longest prefix match at every offset.
 *
 * @see https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToRevertWordToInitialStateII("abacaba", 3); // 2
 */
export const minimumTimeToRevertWordToInitialStateII = (
	word: string,
	k: number,
): number => {
	const n = word.length;
	const z = new Int32Array(n);
	for (let i = 1, left = 0, right = 0; i < n; i++) {
		let length = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
		while (i + length < n && word[length] === word[i + length]) length++;
		z[i] = length;
		if (i + length > right) {
			left = i;
			right = i + length;
		}
	}
	let t = 1;
	while (t * k < n && (z[t * k] ?? 0) < n - t * k) t++;
	return t;
};
