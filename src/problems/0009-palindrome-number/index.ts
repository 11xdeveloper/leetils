/**
 * 9. Palindrome Number
 *
 * Returns whether the integer `x` reads the same forwards and backwards.
 * Negative numbers never do, because of the minus sign.
 *
 * Reverses the second half of the digits arithmetically and compares it with
 * the first half, without converting to a string.
 *
 * @see https://leetcode.com/problems/palindrome-number/
 * @difficulty Easy
 * @timeComplexity O(log x)
 * @spaceComplexity O(1)
 *
 * @example
 * palindromeNumber(121); // true
 * palindromeNumber(-121); // false
 * palindromeNumber(10); // false
 */
export const palindromeNumber = (x: number): boolean => {
	// Numbers ending in 0 would need a leading 0, which only 0 itself has.
	if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

	let firstHalf = x;
	let reversedSecondHalf = 0;
	while (firstHalf > reversedSecondHalf) {
		reversedSecondHalf = reversedSecondHalf * 10 + (firstHalf % 10);
		firstHalf = Math.floor(firstHalf / 10);
	}

	// With an odd number of digits, the middle digit ends up in the reversed half.
	return (
		firstHalf === reversedSecondHalf ||
		firstHalf === Math.floor(reversedSecondHalf / 10)
	);
};
