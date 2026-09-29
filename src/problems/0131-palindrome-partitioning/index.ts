/**
 * 131. Palindrome Partitioning
 *
 * Returns every way to split `s` into substrings that are all palindromes.
 *
 * First records which substrings are palindromes: `s[i..j]` is one when its
 * ends match and `s[i+1..j-1]` is one. Then backtracks, extending each
 * partition with every palindrome that starts where it ends.
 *
 * @see https://leetcode.com/problems/palindrome-partitioning/
 * @difficulty Medium
 * @timeComplexity O(n * 2^n)
 * @spaceComplexity O(n^2) excluding the returned partitions
 *
 * @example
 * palindromePartitioning("aab"); // [["a", "a", "b"], ["aa", "b"]]
 */
export const palindromePartitioning = (s: string): string[][] => {
	const n = s.length;
	// isPalindrome[i * n + j] is 1 when s.slice(i, j + 1) is a palindrome.
	const isPalindrome = new Uint8Array(n * n);
	for (let i = n - 1; i >= 0; i--) {
		for (let j = i; j < n; j++) {
			if (
				s[i] === s[j] &&
				(j - i < 2 || isPalindrome[(i + 1) * n + j - 1] === 1)
			) {
				isPalindrome[i * n + j] = 1;
			}
		}
	}

	const partitions: string[][] = [];
	const parts: string[] = [];
	const split = (start: number): void => {
		if (start === n) {
			partitions.push([...parts]);
			return;
		}
		for (let end = start; end < n; end++) {
			if (isPalindrome[start * n + end] !== 1) continue;
			parts.push(s.slice(start, end + 1));
			split(end + 1);
			parts.pop();
		}
	};
	split(0);

	return partitions;
};
