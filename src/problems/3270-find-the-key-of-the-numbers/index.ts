/**
 * 3270. Find the Key of the Numbers
 *
 * Pad the three numbers to four digits; the key's i-th digit is the
 * smallest of their i-th digits. Returns the key without leading zeros.
 *
 * Build the key digit by digit.
 *
 * @see https://leetcode.com/problems/find-the-key-of-the-numbers/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheKeyOfTheNumbers(987, 879, 798); // 777
 */
export const findTheKeyOfTheNumbers = (
	num1: number,
	num2: number,
	num3: number,
): number => {
	let key = 0;
	for (let place = 1000; place >= 1; place /= 10) {
		const digit = Math.min(
			...[num1, num2, num3].map((num) => Math.floor(num / place) % 10),
		);
		key = key * 10 + digit;
	}
	return key;
};
