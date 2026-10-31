/**
 * 2243. Calculate Digit Sum of a String
 *
 * While `s` is longer than `k`, replaces each group of `k` digits with the
 * sum of its digits. Returns the result.
 *
 * Simulate the rounds.
 *
 * @see https://leetcode.com/problems/calculate-digit-sum-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * calculateDigitSumOfAString("11111222223", 3); // "135"
 */
export const calculateDigitSumOfAString = (s: string, k: number): string => {
	while (s.length > k) {
		let next = "";
		for (let i = 0; i < s.length; i += k) {
			let sum = 0;
			for (const digit of s.slice(i, i + k)) sum += Number(digit);
			next += sum;
		}
		s = next;
	}
	return s;
};
