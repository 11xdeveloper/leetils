/**
 * 3844. Longest Almost-Palindromic Substring
 *
 * A substring is almost-palindromic if deleting exactly one of its
 * characters leaves a palindrome. Returns the longest such length.
 *
 * Interval dynamic programming. A substring qualifies by deleting an end
 * (what's left is a palindrome), or, with equal ends, by deleting a
 * character inside (the middle qualifies).
 *
 * @see https://leetcode.com/problems/longest-almost-palindromic-substring/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * longestAlmostPalindromicSubstring("zzabba"); // 5
 */
export const longestAlmostPalindromicSubstring = (s: string): number => {
	const n = s.length;
	// palindrome/almost[i * n + j] for s[i..j]; empty ranges are palindromes.
	const palindrome = new Uint8Array(n * n);
	const almost = new Uint8Array(n * n);
	const isPalindrome = (i: number, j: number) =>
		i > j || palindrome[i * n + j] === 1;
	let best = Math.min(2, n);
	for (let i = n - 1; i >= 0; i--)
		for (let j = i; j < n; j++) {
			const same = s[i] === s[j];
			palindrome[i * n + j] = same && isPalindrome(i + 1, j - 1) ? 1 : 0;
			const inner = j - i >= 2 ? almost[(i + 1) * n + j - 1] === 1 : true;
			const ok =
				j === i ||
				isPalindrome(i + 1, j) ||
				isPalindrome(i, j - 1) ||
				(same && inner);
			almost[i * n + j] = ok ? 1 : 0;
			if (ok) best = Math.max(best, j - i + 1);
		}
	return best;
};
