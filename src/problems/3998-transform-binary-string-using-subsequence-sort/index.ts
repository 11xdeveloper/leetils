/**
 * 3998. Transform Binary String Using Subsequence Sort
 *
 * Sorting a subsequence of `s` moves 0s left past 1s. For each pattern in
 * `strs`, returns whether its '?'s can be filled so `s` can be turned
 * into it.
 *
 * Reachable strings have the same number of 0s, with every prefix holding
 * at least as many 0s as the same prefix of s. So fill the earliest '?'s
 * with the 0s still needed and check every prefix.
 *
 * @see https://leetcode.com/problems/transform-binary-string-using-subsequence-sort/
 * @difficulty Medium
 * @timeComplexity O(n · q)
 * @spaceComplexity O(n)
 *
 * @example
 * transformBinaryStringUsingSubsequenceSort("101", ["1?1", "0?1", "0?0"]); // [true, true, false]
 */
export const transformBinaryStringUsingSubsequenceSort = (
	s: string,
	strs: readonly string[],
): boolean[] => {
	const zerosBefore = [0];
	for (const c of s)
		zerosBefore.push((zerosBefore.at(-1) ?? 0) + (c === "0" ? 1 : 0));
	const zeros = zerosBefore.at(-1) ?? 0;
	return strs.map((pattern) => {
		let [fixed, unknown] = [0, 0];
		for (const c of pattern) {
			if (c === "0") fixed++;
			else if (c === "?") unknown++;
		}
		let needed = zeros - fixed;
		if (needed < 0 || needed > unknown) return false;
		let seen = 0;
		for (let i = 0; i < pattern.length; i++) {
			const c = pattern[i];
			if (c === "0" || (c === "?" && needed-- > 0)) seen++;
			if (seen < (zerosBefore[i + 1] ?? 0)) return false;
		}
		return true;
	});
};
