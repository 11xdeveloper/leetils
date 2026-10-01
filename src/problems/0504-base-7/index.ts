/**
 * 504. Base 7
 *
 * Returns `num` written in base 7.
 *
 * Takes remainders by 7 for the digits, least significant first, and adds
 * a minus sign for negative numbers.
 *
 * @see https://leetcode.com/problems/base-7/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * base7(-7); // "-10"
 */
export const base7 = (num: number): string => {
	if (num === 0) return "0";
	let digits = "";
	for (let rest = Math.abs(num); rest > 0; rest = Math.floor(rest / 7))
		digits = (rest % 7) + digits;
	return num < 0 ? `-${digits}` : digits;
};
