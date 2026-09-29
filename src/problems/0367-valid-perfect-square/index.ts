/**
 * 367. Valid Perfect Square
 *
 * Returns whether the positive integer `num` is a perfect square, without
 * using a built-in square root.
 *
 * Binary searches for an integer whose square is `num`. Comparing
 * `mid <= num / mid` avoids overflow in languages with fixed-size
 * integers, and a final exact check confirms the match.
 *
 * @see https://leetcode.com/problems/valid-perfect-square/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(1)
 *
 * @example
 * validPerfectSquare(16); // true
 * validPerfectSquare(14); // false
 */
export const validPerfectSquare = (num: number): boolean => {
	let low = 1;
	let high = num;

	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (mid <= num / mid) low = mid;
		else high = mid - 1;
	}

	return low * low === num;
};
