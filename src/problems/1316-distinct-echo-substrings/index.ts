/**
 * 1316. Distinct Echo Substrings
 *
 * Returns how many distinct substrings of `text` are some string written
 * twice (like `abab`).
 *
 * Works along each diagonal `d` of the longest-common-prefix table: the
 * prefix shared by the suffixes at `j` and `j + d` extends the one at
 * `j + 1` whenever `text[j]` equals `text[j + d]`. The substring of length
 * `2d` at `j` is an echo when that prefix reaches `d`. It's the first copy
 * of itself when no earlier suffix shares `2d` characters with suffix `j`,
 * so a first pass records the longest prefix each suffix shares with an
 * earlier one.
 *
 * @see https://leetcode.com/problems/distinct-echo-substrings/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * distinctEchoSubstrings("abcabcabc"); // 3
 */
export const distinctEchoSubstrings = (text: string): number => {
	const n = text.length;
	// sharedWithEarlier[i] is the longest prefix suffix i shares with any earlier suffix.
	const sharedWithEarlier = new Int32Array(n);
	for (let d = 1; d < n; d++) {
		let common = 0;
		for (let j = n - 1 - d; j >= 0; j--) {
			common = text[j] === text[j + d] ? common + 1 : 0;
			if (common > (sharedWithEarlier[j + d] ?? 0))
				sharedWithEarlier[j + d] = common;
		}
	}
	let count = 0;
	for (let d = 1; 2 * d <= n; d++) {
		let common = 0;
		for (let j = n - 1 - d; j >= 0; j--) {
			common = text[j] === text[j + d] ? common + 1 : 0;
			if (j + 2 * d <= n && common >= d && (sharedWithEarlier[j] ?? 0) < 2 * d)
				count++;
		}
	}
	return count;
};
