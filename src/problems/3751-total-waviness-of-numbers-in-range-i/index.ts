/**
 * 3751. Total Waviness of Numbers in Range I
 *
 * A number's waviness counts its inner digits that are strictly greater
 * than both neighbours or strictly less than both. Returns the total
 * waviness of the numbers from `num1` to `num2`.
 *
 * Check every number's digits.
 *
 * @see https://leetcode.com/problems/total-waviness-of-numbers-in-range-i/
 * @difficulty Medium
 * @timeComplexity O((num2 - num1) · log num2)
 * @spaceComplexity O(log num2)
 *
 * @example
 * totalWavinessOfNumbersInRangeI(120, 130); // 3
 */
export const totalWavinessOfNumbersInRangeI = (
	num1: number,
	num2: number,
): number => {
	let total = 0;
	for (let x = num1; x <= num2; x++) {
		const digits = String(x);
		for (let i = 1; i + 1 < digits.length; i++) {
			const [a, b, c] = [
				digits[i - 1] ?? "",
				digits[i] ?? "",
				digits[i + 1] ?? "",
			];
			if ((b > a && b > c) || (b < a && b < c)) total++;
		}
	}
	return total;
};
