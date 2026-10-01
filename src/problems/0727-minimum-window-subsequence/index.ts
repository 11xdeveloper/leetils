/**
 * 727. Minimum Window Subsequence
 *
 * Returns the shortest substring of `s1` that contains `s2` as a
 * subsequence, the leftmost if there are several, or `""` if there's none.
 *
 * Scans forwards to find where `s2` is first completed as a subsequence,
 * then backwards from that end to find the latest start that still
 * contains it, which gives the shortest window ending there. The next
 * search starts just after that start.
 *
 * @see https://leetcode.com/problems/minimum-window-subsequence/
 * @difficulty Hard
 * @timeComplexity O(n · m) for s1 of length n and s2 of length m
 * @spaceComplexity O(1)
 *
 * @example
 * minimumWindowSubsequence("abcdebdde", "bde"); // "bcde"
 */
export const minimumWindowSubsequence = (s1: string, s2: string): string => {
	let best = "";
	for (let i = 0; i < s1.length; ) {
		let matched = 0;
		while (i < s1.length && matched < s2.length) {
			if (s1.charAt(i) === s2.charAt(matched)) matched++;
			i++;
		}
		if (matched < s2.length) break;

		const end = i;
		let start = end - 1;
		for (let remaining = s2.length - 1; remaining >= 0; start--) {
			if (s1.charAt(start) === s2.charAt(remaining)) remaining--;
		}
		start++;
		if (best === "" || end - start < best.length) best = s1.slice(start, end);
		i = start + 1;
	}
	return best;
};
