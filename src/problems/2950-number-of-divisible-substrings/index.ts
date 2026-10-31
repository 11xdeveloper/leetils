/** Each letter's digit, as on an old phone keypad grouped in threes. */
const DIGIT = [
	1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9,
];

/**
 * 2950. Number of Divisible Substrings
 *
 * Letters map to digits: `a`–`b` to 1, `c`–`e` to 2, `f`–`h` to 3, and so
 * on in threes up to `x`–`z` as 9. A substring is divisible if its digit
 * sum is divisible by its length. Returns the number of divisible
 * substrings.
 *
 * Divisible means the average digit is a whole number from 1 to 9. For
 * each average `a`, count substrings whose digits minus `a` sum to 0,
 * with prefix sums.
 *
 * @see https://leetcode.com/problems/number-of-divisible-substrings/
 * @difficulty Medium
 * @timeComplexity O(9 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfDivisibleSubstrings("asdf"); // 6
 */
export const numberOfDivisibleSubstrings = (word: string): number => {
	let count = 0;
	for (let average = 1; average <= 9; average++) {
		const seen = new Map([[0, 1]]);
		let sum = 0;
		for (let i = 0; i < word.length; i++) {
			sum += (DIGIT[word.charCodeAt(i) - 97] ?? 0) - average;
			count += seen.get(sum) ?? 0;
			seen.set(sum, (seen.get(sum) ?? 0) + 1);
		}
	}
	return count;
};
