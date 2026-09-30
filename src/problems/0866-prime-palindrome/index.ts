/**
 * 866. Prime Palindrome
 *
 * Returns the smallest number at least `n` that is both prime and a
 * palindrome.
 *
 * Every palindrome with an even number of digits is divisible by 11, so
 * apart from 11 only odd-length palindromes need checking. It builds them
 * in increasing order from their first halves and tests each for primality
 * by trial division.
 *
 * @see https://leetcode.com/problems/prime-palindrome/
 * @difficulty Medium
 * @timeComplexity O(answer) in the worst case: about √answer palindromes, each tested in O(√answer)
 * @spaceComplexity O(1)
 *
 * @example
 * primePalindrome(13); // 101
 */
export const primePalindrome = (n: number): number => {
	const isPrime = (value: number): boolean => {
		if (value < 2) return false;
		for (let d = 2; d * d <= value; d++) if (value % d === 0) return false;
		return true;
	};
	if (n >= 8 && n <= 11) return 11;

	for (let root = 1; ; root++) {
		const text = String(root);
		const palindrome = Number(text + [...text].reverse().slice(1).join(""));
		if (palindrome >= n && isPrime(palindrome)) return palindrome;
	}
};
