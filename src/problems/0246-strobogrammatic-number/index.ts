// The digits that still read as digits when rotated 180 degrees.
const ROTATED: Readonly<Record<string, string>> = {
	0: "0",
	1: "1",
	6: "9",
	8: "8",
	9: "6",
};

/**
 * 246. Strobogrammatic Number
 *
 * Returns whether the number written in `num` reads the same when rotated
 * 180 degrees (turned upside down), like 69 or 818.
 *
 * Rotating reverses the digits and turns each one upside down, so each digit
 * must rotate into the digit at the mirrored position.
 *
 * @see https://leetcode.com/problems/strobogrammatic-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * strobogrammaticNumber("69"); // true
 * strobogrammaticNumber("962"); // false
 */
export const strobogrammaticNumber = (num: string): boolean => {
	for (let i = 0, j = num.length - 1; i <= j; i++, j--) {
		if (ROTATED[num.charAt(i)] !== num.charAt(j)) return false;
	}
	return true;
};
