/**
 * Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.
 * The algorithm for myAtoi(string s) is as follows:
 * 1. Read in and ignore any leading whitespace.
 * 2. Check if the next character (if not already at the end of the string) is '-' or '+'.
 * 3. Read in next the characters until the next non-digit character or the end of the input is reached.
 * 4. Convert these digits into an integer.
 * 5. If no digits were read, return 0.
 * 
 * @param s - The input string to convert
 * @returns The 32-bit signed integer result
 * 
 * @example
 * Input: s = "42"
 * Output: 42
 * Explanation: The underlined characters are what is read in, the caret is the current reader position.
 * 
 * @example
 * Input: s = "   -42"
 * Output: -42
 * Explanation: Leading whitespace is read and ignored, then '-' indicates a negative number.
 * 
 * @example
 * Input: s = "4193 with words"
 * Output: 4193
 * Explanation: Reading stops at non-digit character.
 * 
 * @timeComplexity O(n) - where n is the length of the string
 * @spaceComplexity O(1) - only using primitive values
 */
export const myAtoi = (s: string): number =>
	((x: number) => (Number.isNaN(x) ? 0 : x))(Number.parseInt(s.trim()));
