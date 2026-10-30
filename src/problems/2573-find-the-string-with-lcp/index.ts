/**
 * 2573. Find the String with LCP
 *
 * `lcp[i][j]` is the length of the longest common prefix of the suffixes
 * starting at `i` and `j`. Returns the lexicographically smallest
 * lowercase string with this matrix, or "" if there is none.
 *
 * Positions with a nonzero entry must share a letter; give each new group
 * the next unused letter, in order. Then rebuild the matrix from the
 * string and check it matches.
 *
 * @see https://leetcode.com/problems/find-the-string-with-lcp/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheStringWithLcp([[4, 0, 2, 0], [0, 3, 0, 1], [2, 0, 2, 0], [0, 1, 0, 1]]); // "abab"
 */
export const findTheStringWithLcp = (
	lcp: readonly (readonly number[])[],
): string => {
	const n = lcp.length;
	const letters = Array.from({ length: n }, () => -1);
	let next = 0;
	for (let i = 0; i < n; i++) {
		if (letters[i] !== -1) continue;
		if (next === 26) return "";
		for (let j = i; j < n; j++) if ((lcp[i]?.[j] ?? 0) > 0) letters[j] = next;
		next++;
	}

	// Check from the bottom-right, where each entry depends on the next diagonal one.
	const below = Array.from({ length: n + 1 }, () => 0);
	for (let i = n - 1; i >= 0; i--) {
		const row = Array.from({ length: n + 1 }, () => 0);
		for (let j = n - 1; j >= 0; j--) {
			row[j] = letters[i] === letters[j] ? 1 + (below[j + 1] ?? 0) : 0;
			if (row[j] !== lcp[i]?.[j]) return "";
		}
		below.splice(0, n + 1, ...row);
	}
	return letters.map((letter) => String.fromCharCode(97 + letter)).join("");
};
