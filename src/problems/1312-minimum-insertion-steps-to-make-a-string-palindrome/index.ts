/**
 * 1312. Minimum Insertion Steps to Make a String Palindrome
 *
 * Returns the fewest characters to insert into `s` to make it a palindrome.
 *
 * The characters of the longest palindromic subsequence can stay put, and
 * every other character needs a partner inserted. That subsequence comes
 * from interval dynamic programming, keeping one row.
 *
 * @see https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumInsertionStepsToMakeAStringPalindrome("mbadm"); // 2
 */
export const minimumInsertionStepsToMakeAStringPalindrome = (
	s: string,
): number => {
	const n = s.length;
	// longest[j] is the longest palindromic subsequence of s[i … j] for the current i.
	const longest = new Array<number>(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		longest[i] = 1;
		let diagonal = 0;
		for (let j = i + 1; j < n; j++) {
			const below = longest[j] ?? 0;
			longest[j] =
				s[i] === s[j] ? diagonal + 2 : Math.max(below, longest[j - 1] ?? 0);
			diagonal = below;
		}
	}
	return n - (longest[n - 1] ?? 0);
};
