/**
 * 1903. Largest Odd Number in String
 *
 * Returns the largest odd number that is a substring of the digit string
 * `num`, or "".
 *
 * Keep everything up to the last odd digit.
 *
 * @see https://leetcode.com/problems/largest-odd-number-in-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestOddNumberInString("52"); // "5"
 */
export const largestOddNumberInString = (num: string): string => {
	for (let i = num.length - 1; i >= 0; i--)
		if (Number(num[i]) % 2 === 1) return num.slice(0, i + 1);
	return "";
};
