import { strobogrammaticNumberII } from "../0247-strobogrammatic-number-ii";

/** How many strobogrammatic numbers have exactly `length` digits. */
const countOfLength = (length: number): number => {
	if (length === 1) return 3;
	// The outer pair can't be 0s: 4 choices. Each inner pair has 5, and an odd
	// length adds a middle digit of 0, 1 or 8.
	return 4 * 5 ** (Math.floor(length / 2) - 1) * (length % 2 === 1 ? 3 : 1);
};

/**
 * 248. Strobogrammatic Number III
 *
 * Returns how many numbers in the range `[low, high]` (given as strings of
 * up to 15 digits) read the same when rotated 180 degrees (turned upside
 * down).
 *
 * Every length strictly between the two bounds' lengths counts in full,
 * which a formula gives directly. Only the numbers with the same length as
 * a bound are listed (with Strobogrammatic Number II) and compared with it.
 * Numbers of equal length compare correctly as strings.
 *
 * @see https://leetcode.com/problems/strobogrammatic-number-iii/
 * @difficulty Hard
 * @timeComplexity O(L * 5^(L/2)) where L is the length of high
 * @spaceComplexity O(L * 5^(L/2))
 *
 * @example
 * strobogrammaticNumberIII("50", "100"); // 3: 69, 88 and 96
 */
export const strobogrammaticNumberIII = (low: string, high: string): number => {
	const inRange = (number: string): boolean =>
		(number.length > low.length || number >= low) &&
		(number.length < high.length || number <= high);

	let count = 0;
	for (let length = low.length; length <= high.length; length++) {
		count +=
			length === low.length || length === high.length
				? strobogrammaticNumberII(length).filter(inRange).length
				: countOfLength(length);
	}

	return count;
};
