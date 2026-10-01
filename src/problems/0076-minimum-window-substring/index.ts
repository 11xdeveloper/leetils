/**
 * 76. Minimum Window Substring
 *
 * Returns the shortest substring of `s` that contains every character of `t`,
 * including repeats, or `""` if there is none.
 *
 * Slides a window over `s`: extends the right end until the window covers
 * `t`, then shrinks the left end as far as it can while still covering it.
 * A count of characters still missing tells in constant time whether the
 * window covers `t`.
 *
 * @see https://leetcode.com/problems/minimum-window-substring/
 * @difficulty Hard
 * @timeComplexity O(m + n)
 * @spaceComplexity O(k) where k is the size of the character set
 *
 * @example
 * minimumWindowSubstring("ADOBECODEBANC", "ABC"); // "BANC"
 */
export const minimumWindowSubstring = (s: string, t: string): string => {
	const needed = new Map<string, number>();
	for (const char of t) needed.set(char, (needed.get(char) ?? 0) + 1);

	let missing = t.length;
	let bestStart = 0;
	let bestLength = Number.POSITIVE_INFINITY;
	let left = 0;

	for (let right = 0; right < s.length; right++) {
		const char = s.charAt(right);
		const count = needed.get(char);
		if (count !== undefined) {
			if (count > 0) missing--;
			needed.set(char, count - 1);
		}

		while (missing === 0) {
			if (right - left + 1 < bestLength) {
				bestStart = left;
				bestLength = right - left + 1;
			}

			const leftChar = s.charAt(left);
			const leftCount = needed.get(leftChar);
			if (leftCount !== undefined) {
				if (leftCount === 0) missing++;
				needed.set(leftChar, leftCount + 1);
			}
			left++;
		}
	}

	return bestLength === Number.POSITIVE_INFINITY
		? ""
		: s.slice(bestStart, bestStart + bestLength);
};
