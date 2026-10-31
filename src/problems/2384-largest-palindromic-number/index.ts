/**
 * 2384. Largest Palindromic Number
 *
 * Builds the largest palindrome (no leading zeros) from some of the
 * digits of `num`.
 *
 * Pair up digits from 9 down for the outer half (no zero pairs unless
 * something larger is outside them), and put the largest leftover digit
 * in the middle.
 *
 * @see https://leetcode.com/problems/largest-palindromic-number/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestPalindromicNumber("444947137"); // "7449447"
 */
export const largestPalindromicNumber = (num: string): string => {
	const counts = new Array<number>(10).fill(0);
	for (const digit of num)
		counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
	let half = "";
	for (let digit = 9; digit >= 0; digit--) {
		if (digit === 0 && half === "") break;
		const pairs = Math.floor((counts[digit] ?? 0) / 2);
		half += String(digit).repeat(pairs);
		counts[digit] = (counts[digit] ?? 0) - 2 * pairs;
	}
	let middle = "";
	for (let digit = 9; digit >= 0 && middle === ""; digit--)
		if (counts[digit]) middle = String(digit);
	return half + middle + [...half].reverse().join("") || "0";
};
