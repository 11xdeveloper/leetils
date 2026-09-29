const isSquare = (n: number): boolean => Number.isInteger(Math.sqrt(n));

/**
 * 279. Perfect Squares
 *
 * Returns the fewest perfect squares (1, 4, 9, 16, …) that add up to `n`.
 *
 * Uses number theory rather than dynamic programming. By Lagrange's
 * four-square theorem the answer is at most 4, and by Legendre's
 * three-square theorem it is exactly 4 when `n` has the form 4^a(8b + 7).
 * Otherwise it's 1 if `n` is a square, 2 if some square leaves a square
 * remainder, and 3 if not.
 *
 * @see https://leetcode.com/problems/perfect-squares/
 * @difficulty Medium
 * @timeComplexity O(√n)
 * @spaceComplexity O(1)
 *
 * @example
 * perfectSquares(12); // 3: 4 + 4 + 4
 * perfectSquares(13); // 2: 4 + 9
 */
export const perfectSquares = (n: number): number => {
	if (isSquare(n)) return 1;

	let reduced = n;
	while (reduced % 4 === 0) reduced /= 4;
	if (reduced % 8 === 7) return 4;

	for (let root = 1; root * root < n; root++) {
		if (isSquare(n - root * root)) return 2;
	}

	return 3;
};
