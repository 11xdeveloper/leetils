/**
 * 3280. Convert Date to Binary
 *
 * Write the year, month and day of a `"yyyy-mm-dd"` date in binary, without
 * leading zeros, joined by dashes.
 *
 * Convert each part.
 *
 * @see https://leetcode.com/problems/convert-date-to-binary/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * convertDateToBinary("2080-02-29"); // "100000100000-10-11101"
 */
export const convertDateToBinary = (date: string): string =>
	date
		.split("-")
		.map((part) => Number(part).toString(2))
		.join("-");
