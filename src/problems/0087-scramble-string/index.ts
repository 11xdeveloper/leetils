/**
 * 87. Scramble String
 *
 * Returns whether `s2` is a scramble of `s1`: `s1` split into two non-empty
 * parts, which are optionally swapped and then each scrambled the same way,
 * down to single characters.
 *
 * Tries every split point, with and without a swap, memoizing each pair of
 * substrings. A quick check that the two substrings have the same letters
 * prunes most branches.
 *
 * @see https://leetcode.com/problems/scramble-string/
 * @difficulty Hard
 * @timeComplexity O(n^4)
 * @spaceComplexity O(n^3)
 *
 * @example
 * scrambleString("great", "rgeat"); // true
 * scrambleString("abcde", "caebd"); // false
 */
export const scrambleString = (s1: string, s2: string): boolean => {
	const memo = new Map<string, boolean>();

	const sameLetters = (a: string, b: string): boolean =>
		[...a].sort().join("") === [...b].sort().join("");

	const isScramble = (a: string, b: string): boolean => {
		if (a === b) return true;
		const key = `${a},${b}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;

		let result = false;
		if (sameLetters(a, b)) {
			const n = a.length;
			for (let i = 1; i < n && !result; i++) {
				result =
					(isScramble(a.slice(0, i), b.slice(0, i)) &&
						isScramble(a.slice(i), b.slice(i))) ||
					(isScramble(a.slice(0, i), b.slice(n - i)) &&
						isScramble(a.slice(i), b.slice(0, n - i)));
			}
		}

		memo.set(key, result);
		return result;
	};

	return isScramble(s1, s2);
};
