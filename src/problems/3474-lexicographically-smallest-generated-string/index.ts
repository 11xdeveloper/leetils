/**
 * 3474. Lexicographically Smallest Generated String
 *
 * Build the lexicographically smallest string of length n + m - 1 where,
 * for each i, the m letters from i equal `str2` if `str1[i]` is "T" and
 * differ from it if "F". Returns `""` if that's impossible.
 *
 * Copy `str2` into every "T" window, failing on a clash, and fill the rest
 * with "a". Then, left to right, any "F" window still equal to `str2` gets
 * its last freely chosen letter raised to "b" (the cheapest fix), failing
 * if it has none.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-generated-string/
 * @difficulty Hard
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * lexicographicallySmallestGeneratedString("TFTF", "ab"); // "ababa"
 */
export const lexicographicallySmallestGeneratedString = (
	str1: string,
	str2: string,
): string => {
	const n = str1.length;
	const m = str2.length;
	const word: string[] = new Array<string>(n + m - 1).fill("");
	const fixed = new Uint8Array(n + m - 1);
	for (let i = 0; i < n; i++) {
		if (str1[i] !== "T") continue;
		for (let j = 0; j < m; j++) {
			const letter = str2.charAt(j);
			if (fixed[i + j] && word[i + j] !== letter) return "";
			word[i + j] = letter;
			fixed[i + j] = 1;
		}
	}
	for (let p = 0; p < word.length; p++) if (!fixed[p]) word[p] = "a";
	const matches = (i: number): boolean => {
		for (let j = 0; j < m; j++) if (word[i + j] !== str2[j]) return false;
		return true;
	};
	for (let i = 0; i < n; i++) {
		if (str1[i] !== "F" || !matches(i)) continue;
		let changed = false;
		for (let p = i + m - 1; p >= i && !changed; p--)
			if (!fixed[p]) {
				word[p] = "b";
				changed = true;
			}
		if (!changed) return "";
	}
	return word.join("");
};
