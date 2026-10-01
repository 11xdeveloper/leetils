import { nextPermutation } from "../0031-next-permutation";

/**
 * 1842. Next Palindrome Using Same Digits
 *
 * Returns the smallest palindrome larger than the palindrome `num` that
 * uses the same digits, or "".
 *
 * A palindrome is fixed by its first half, so take the next permutation of
 * the first half (none if it's already the largest) and mirror it.
 *
 * @see https://leetcode.com/problems/next-palindrome-using-same-digits/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nextPalindromeUsingSameDigits("45544554"); // "54455445"
 */
export const nextPalindromeUsingSameDigits = (num: string): string => {
	const half = num.length >> 1;
	const digits = Array.from(num.slice(0, half), Number);
	const isLargest = digits.every(
		(digit, i) => i === 0 || digit <= (digits[i - 1] ?? 0),
	);
	if (isLargest) return "";
	nextPermutation(digits);
	const front = digits.join("");
	return (
		front + num.slice(half, num.length - half) + [...front].reverse().join("")
	);
};
