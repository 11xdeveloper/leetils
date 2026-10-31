/**
 * 2094. Finding 3-Digit Even Numbers
 *
 * Returns, in ascending order, the distinct even three-digit numbers
 * (no leading zero) that can be formed from the given digits, using each
 * digit at most as often as it appears.
 *
 * Check every even number from 100 to 998 against the digit counts.
 *
 * @see https://leetcode.com/problems/finding-3-digit-even-numbers/
 * @difficulty Easy
 * @timeComplexity O(n + 450)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * finding3DigitEvenNumbers([2, 1, 3, 0]); // [102, 120, 130, 132, 210, 230, 302, 310, 312, 320]
 */
export const finding3DigitEvenNumbers = (
	digits: readonly number[],
): number[] => {
	const available = new Array<number>(10).fill(0);
	for (const digit of digits) available[digit] = (available[digit] ?? 0) + 1;
	const numbers: number[] = [];
	for (let number = 100; number < 1000; number += 2) {
		const needed = new Array<number>(10).fill(0);
		for (const char of String(number))
			needed[Number(char)] = (needed[Number(char)] ?? 0) + 1;
		if (needed.every((count, digit) => count <= (available[digit] ?? 0)))
			numbers.push(number);
	}
	return numbers;
};
