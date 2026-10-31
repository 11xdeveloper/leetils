const zFunction = (s: string): Int32Array => {
	const z = new Int32Array(s.length);
	for (let i = 1, left = 0, right = 0; i < s.length; i++) {
		let length = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
		while (i + length < s.length && s[length] === s[i + length]) length++;
		z[i] = length;
		if (i + length > right) {
			left = i;
			right = i + length;
		}
	}
	return z;
};

/**
 * 3303. Find the Occurrence of First Almost Equal Substring
 *
 * The first index where a substring of `s` differs from `pattern` in at
 * most one letter, or -1.
 *
 * A window matches if its longest common prefix with `pattern` and its
 * longest common suffix with it leave at most one letter uncovered. The
 * Z-function of `pattern + s` gives the prefixes, and of both reversed gives
 * the suffixes.
 *
 * @see https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring/
 * @difficulty Hard
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findTheOccurrenceOfFirstAlmostEqualSubstring("abcdefg", "bcdffg"); // 1
 */
export const findTheOccurrenceOfFirstAlmostEqualSubstring = (
	s: string,
	pattern: string,
): number => {
	const n = s.length;
	const m = pattern.length;
	const prefix = zFunction(`${pattern}\u0000${s}`);
	const suffix = zFunction(
		`${[...pattern].reverse().join("")}\u0000${[...s].reverse().join("")}`,
	);
	for (let i = 0; i + m <= n; i++) {
		const front = prefix[m + 1 + i] ?? 0;
		const back = suffix[m + 1 + (n - i - m)] ?? 0;
		if (front + back >= m - 1) return i;
	}
	return -1;
};
