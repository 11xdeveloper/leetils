/**
 * 1945. Sum of Digits of String After Convert
 *
 * Replaces each letter of `s` with its alphabet position, then replaces
 * the resulting number with its digit sum `k` times.
 *
 * The first transform can sum the digits of each letter's position
 * directly; the rest work on a small number.
 *
 * @see https://leetcode.com/problems/sum-of-digits-of-string-after-convert/
 * @difficulty Easy
 * @timeComplexity O(n + k)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfDigitsOfStringAfterConvert("leetcode", 2); // 6
 */
export const sumOfDigitsOfStringAfterConvert = (
	s: string,
	k: number,
): number => {
	const digitSum = (value: number) => {
		let sum = 0;
		for (let rest = value; rest > 0; rest = Math.floor(rest / 10))
			sum += rest % 10;
		return sum;
	};
	let value = 0;
	for (let i = 0; i < s.length; i++) value += digitSum(s.charCodeAt(i) - 96);
	for (let step = 1; step < k; step++) value = digitSum(value);
	return value;
};
