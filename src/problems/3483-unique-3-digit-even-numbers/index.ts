/**
 * 3483. Unique 3-Digit Even Numbers
 *
 * How many distinct three-digit even numbers (no leading zero) can be made
 * from the given digits, using each at most once.
 *
 * Check every even number from 100 to 998 against the digit counts.
 *
 * @see https://leetcode.com/problems/unique-3-digit-even-numbers/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * unique3DigitEvenNumbers([1, 2, 3, 4]); // 12
 */
export const unique3DigitEvenNumbers = (digits: readonly number[]): number => {
	const available = new Array<number>(10).fill(0);
	for (const digit of digits) available[digit] = (available[digit] ?? 0) + 1;
	let count = 0;
	for (let num = 100; num < 1000; num += 2) {
		const needed = new Array<number>(10).fill(0);
		for (const digit of String(num))
			needed[Number(digit)] = (needed[Number(digit)] ?? 0) + 1;
		if (needed.every((n, d) => n <= (available[d] ?? 0))) count++;
	}
	return count;
};
