/**
 * 69. Sqrt(x)
 *
 * Returns the square root of the non-negative integer `x`, rounded down,
 * without using a built-in exponent function or operator.
 *
 * Binary searches for the largest integer whose square is at most `x`.
 * Comparing `mid <= x / mid` instead of `mid * mid <= x` avoids overflow in
 * languages with fixed-size integers.
 *
 * @see https://leetcode.com/problems/sqrtx/
 * @difficulty Easy
 * @timeComplexity O(log x)
 * @spaceComplexity O(1)
 *
 * @example
 * sqrtx(8); // 2
 */
export const sqrtx = (x: number): number => {
	let low = 0;
	let high = x;

	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (mid <= x / mid) low = mid;
		else high = mid - 1;
	}

	return low;
};
