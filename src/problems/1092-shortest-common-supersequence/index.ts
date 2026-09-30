/**
 * 1092. Shortest Common Supersequence
 *
 * Returns a shortest string that has both `str1` and `str2` as
 * subsequences. Any shortest answer is accepted.
 *
 * A shortest supersequence writes a longest common subsequence once and
 * everything else once. It computes the LCS table, then walks back through
 * it, emitting shared letters once and other letters from whichever string
 * the table says to drop.
 *
 * @see https://leetcode.com/problems/shortest-common-supersequence/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * shortestCommonSupersequence("abac", "cab"); // "cabac"
 */
export const shortestCommonSupersequence = (
	str1: string,
	str2: string,
): string => {
	const [m, n] = [str1.length, str2.length];
	const lcs = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	for (let i = 1; i <= m; i++) {
		const row = lcs[i] ?? [];
		for (let j = 1; j <= n; j++) {
			row[j] =
				str1.charAt(i - 1) === str2.charAt(j - 1)
					? (lcs[i - 1]?.[j - 1] ?? 0) + 1
					: Math.max(lcs[i - 1]?.[j] ?? 0, row[j - 1] ?? 0);
		}
	}

	const reversed: string[] = [];
	let [i, j] = [m, n];
	while (i > 0 && j > 0) {
		if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
			reversed.push(str1.charAt(--i));
			j--;
		} else if ((lcs[i - 1]?.[j] ?? 0) >= (lcs[i]?.[j - 1] ?? 0)) {
			reversed.push(str1.charAt(--i));
		} else {
			reversed.push(str2.charAt(--j));
		}
	}
	return str1.slice(0, i) + str2.slice(0, j) + reversed.reverse().join("");
};
