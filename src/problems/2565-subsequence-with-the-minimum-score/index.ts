/**
 * 2565. Subsequence With the Minimum Score
 *
 * Remove some characters of `t` so it becomes a subsequence of `s`. The
 * score is `right - left + 1`, spanning the first and last removed
 * indices, or 0 if none are. Returns the smallest score.
 *
 * Only the span matters, so remove everything between a kept prefix and
 * a kept suffix. Match prefixes of `t` greedily from the front of `s` and
 * suffixes from the back, then for each prefix find the longest suffix
 * that starts after it ends.
 *
 * @see https://leetcode.com/problems/subsequence-with-the-minimum-score/
 * @difficulty Hard
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m)
 *
 * @example
 * subsequenceWithTheMinimumScore("abacaba", "bzaa"); // 1
 */
export const subsequenceWithTheMinimumScore = (
	s: string,
	t: string,
): number => {
	const m = t.length;
	// suffixStart[j]: the latest index of `s` from which t[j..] still matches.
	const suffixStart = Array.from({ length: m + 1 }, () => -1);
	suffixStart[m] = s.length;
	for (let j = m - 1, p = s.length - 1; j >= 0; j--) {
		while (p >= 0 && s.charAt(p) !== t.charAt(j)) p--;
		if (p < 0) break;
		suffixStart[j] = p--;
	}

	let best = m;
	let j = 0;
	while (suffixStart[j] === -1) j++;
	best = j;
	for (let i = 0, p = 0; i < m; i++) {
		// Keep t[..i], which ends just before index p + 1 of s.
		while (p < s.length && s.charAt(p) !== t.charAt(i)) p++;
		if (p >= s.length) break;
		p++;
		j = Math.max(j, i + 1);
		while (j <= m && (suffixStart[j] ?? 0) < p) j++;
		best = Math.min(best, j - i - 1);
	}
	return best;
};
