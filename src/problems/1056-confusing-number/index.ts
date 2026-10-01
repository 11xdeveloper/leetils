/**
 * 1056. Confusing Number
 *
 * A confusing number becomes a different valid number when rotated 180°:
 * 0, 1, 6, 8 and 9 rotate to 0, 1, 9, 8 and 6, and any other digit makes it
 * invalid. Returns whether `n` is confusing.
 *
 * Builds the rotated number digit by digit, reading `n` from its last digit.
 *
 * @see https://leetcode.com/problems/confusing-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * confusingNumber(89); // true: rotates to 68
 */
export const confusingNumber = (n: number): boolean => {
	const rotate = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6];
	let rotated = 0;
	for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
		const digit = rotate[rest % 10] ?? -1;
		if (digit === -1) return false;
		rotated = rotated * 10 + digit;
	}
	return rotated !== n;
};
