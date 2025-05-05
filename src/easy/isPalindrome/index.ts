/**
 * Given an integer x, return true if x is a palindrome, and false otherwise.
 * An integer is a palindrome when it reads the same forward and backward.
 * 
 * @param x - The integer to check
 * @returns true if x is a palindrome, false otherwise
 * 
 * @example
 * Input: x = 121
 * Output: true
 * Explanation: 121 reads as 121 from left to right and from right to left
 * 
 * @example
 * Input: x = -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, it becomes 121-.
 * Therefore it is not a palindrome.
 * 
 * @example
 * Input: x = 10
 * Output: false
 * Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 * 
 * @timeComplexity O(n) - where n is the number of digits in x
 * @spaceComplexity O(n) - for storing the string representation
 */
export const isPalindrome = (x: number): boolean =>
	((s: string) => s.split("").reverse().join("") === s)(x.toString());
