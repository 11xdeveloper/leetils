/** For each index, the longest palindrome starting there. */
const palindromesFrom = (text: string): Int32Array => {
	const n = text.length;
	const longest = new Int32Array(n + 1);
	for (let center = 0; center < 2 * n - 1; center++) {
		let left = Math.floor(center / 2);
		let right = left + (center % 2);
		while (left >= 0 && right < n && text[left] === text[right]) {
			longest[left] = Math.max(longest[left] ?? 0, right - left + 1);
			left--;
			right++;
		}
	}
	return longest;
};

/**
 * 3504. Longest Palindrome After Substring Concatenation II
 *
 * The longest palindrome made by joining a substring of `s` (possibly
 * empty) with a substring of `t` (possibly empty).
 *
 * Besides palindromes within one string, the joined palindrome has a piece
 * of `s` ending at i that mirrors a piece of `t` starting at j, with a
 * palindrome in the middle taken from right after i in `s` or right
 * before j in `t`. Dynamic programming gives the longest mirrored piece
 * for every (i, j), and expanding around centres gives the longest
 * palindrome starting (or ending) at each index.
 *
 * @see https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii/
 * @difficulty Hard
 * @timeComplexity O(n · m + n² + m²)
 * @spaceComplexity O(n + m)
 *
 * @example
 * longestPalindromeAfterSubstringConcatenationII("abcde", "ecdba"); // 5
 */
export const longestPalindromeAfterSubstringConcatenationII = (
	s: string,
	t: string,
): number => {
	const n = s.length;
	const m = t.length;
	const fromS = palindromesFrom(s);
	const reversedT = [...t].reverse().join("");
	const endingT = palindromesFrom(reversedT);
	let best = Math.max(...fromS, ...endingT);
	// mirror[j]: for the current i, how far s[..i] reversed matches t[j..].
	let previous = new Int32Array(m + 1);
	for (let i = 0; i < n; i++) {
		const current = new Int32Array(m + 1);
		for (let j = m - 1; j >= 0; j--) {
			if (s[i] !== t[j]) continue;
			const length = (previous[j + 1] ?? 0) + 1;
			current[j] = length;
			const middle = Math.max(
				fromS[i + 1] ?? 0,
				j > 0 ? (endingT[m - j] ?? 0) : 0,
			);
			best = Math.max(best, 2 * length + middle);
		}
		previous = current;
	}
	return best;
};
