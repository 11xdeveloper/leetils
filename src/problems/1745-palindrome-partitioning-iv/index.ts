/**
 * 1745. Palindrome Partitioning IV
 *
 * Returns whether `s` splits into three non-empty palindromes.
 *
 * Tabulate which substrings are palindromes (expanding from each centre),
 * then try every pair of cut points.
 *
 * @see https://leetcode.com/problems/palindrome-partitioning-iv/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * palindromePartitioningIV("abcbdd"); // true
 */
export const palindromePartitioningIV = (s: string): boolean => {
	const n = s.length;
	// palindrome[i · n + j] says whether s[i … j] is a palindrome.
	const palindrome = new Uint8Array(n * n);
	for (let centre = 0; centre < 2 * n - 1; centre++) {
		let [i, j] = [Math.floor(centre / 2), Math.ceil(centre / 2)];
		while (i >= 0 && j < n && s[i] === s[j]) {
			palindrome[i * n + j] = 1;
			i--;
			j++;
		}
	}
	for (let first = 0; first < n - 2; first++) {
		if (!palindrome[first]) continue;
		for (let second = first + 1; second < n - 1; second++) {
			if (
				palindrome[(first + 1) * n + second] &&
				palindrome[(second + 1) * n + n - 1]
			)
				return true;
		}
	}
	return false;
};
