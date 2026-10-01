/**
 * 1796. Second Largest Digit in a String
 *
 * Returns the second largest distinct digit in the alphanumeric `s`, or
 * -1.
 *
 * Tracks the two largest distinct digits.
 *
 * @see https://leetcode.com/problems/second-largest-digit-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * secondLargestDigitInAString("dfa12321afd"); // 2
 */
export const secondLargestDigitInAString = (s: string): number => {
	let [first, second] = [-1, -1];
	for (const char of s) {
		if (char < "0" || char > "9") continue;
		const digit = Number(char);
		if (digit > first) [first, second] = [digit, first];
		else if (digit < first && digit > second) second = digit;
	}
	return second;
};
