/**
 * 906. Super Palindromes
 *
 * A super-palindrome is a palindrome that is the square of a palindrome.
 * Counts those between `left` and `right` inclusive (given as strings, up
 * to 10^18).
 *
 * Its square root is a palindrome below 10^9, which is built from a first
 * half below 10^5, with an even or odd number of digits. It squares each
 * such palindrome with `BigInt` and checks the result.
 *
 * @see https://leetcode.com/problems/super-palindromes/
 * @difficulty Hard
 * @timeComplexity O(10^5 · 18) for the roots and their squares
 * @spaceComplexity O(1)
 *
 * @example
 * superPalindromes("4", "1000"); // 4: 4, 9, 121 and 484
 */
export const superPalindromes = (left: string, right: string): number => {
	const low = BigInt(left);
	const high = BigInt(right);
	const isPalindrome = (text: string): boolean =>
		text === [...text].reverse().join("");

	let count = 0;
	for (let half = 1; half < 100_000; half++) {
		const text = String(half);
		const reversed = [...text].reverse().join("");
		for (const root of [
			BigInt(text + reversed),
			BigInt(text + reversed.slice(1)),
		]) {
			const square = root * root;
			if (square >= low && square <= high && isPalindrome(String(square)))
				count++;
		}
	}
	return count;
};
