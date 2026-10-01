/**
 * 1638. Count Substrings That Differ by One Character
 *
 * Counts the pairs of a substring of `s` and an equally long substring of
 * `t` that differ in exactly one position.
 *
 * Each pair is determined by its mismatched positions `(i, j)` and how far
 * it extends around them over matching characters. So precompute, for
 * every `(i, j)`, how many characters match just before and just after,
 * and add `(before + 1) · (after + 1)` for each mismatch.
 *
 * @see https://leetcode.com/problems/count-substrings-that-differ-by-one-character/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * countSubstringsThatDifferByOneCharacter("ab", "bb"); // 3
 */
export const countSubstringsThatDifferByOneCharacter = (
	s: string,
	t: string,
): number => {
	const [m, n] = [s.length, t.length];
	// before[i][j] matches ending just before i and j; after[i][j] starting just after.
	const before = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	const after = Array.from({ length: m + 2 }, () =>
		new Array<number>(n + 2).fill(0),
	);
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const row = before[i];
			if (row && s[i - 1] === t[j - 1])
				row[j] = (before[i - 1]?.[j - 1] ?? 0) + 1;
		}
	}
	for (let i = m - 1; i >= 0; i--) {
		for (let j = n - 1; j >= 0; j--) {
			const row = after[i];
			if (row && s[i] === t[j]) row[j] = (after[i + 1]?.[j + 1] ?? 0) + 1;
		}
	}
	let count = 0;
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (s[i] !== t[j])
				count +=
					((before[i]?.[j] ?? 0) + 1) * ((after[i + 1]?.[j + 1] ?? 0) + 1);
		}
	}
	return count;
};
