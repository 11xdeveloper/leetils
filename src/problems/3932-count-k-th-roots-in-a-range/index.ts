/**
 * 3932. Count K-th Roots in a Range
 *
 * Counts the perfect k-th powers from `l` to `r`.
 *
 * Count the non-negative x with x^k ≤ r, minus those with x^k < l, using
 * a floating-point root nudged to the exact integer.
 *
 * @see https://leetcode.com/problems/count-k-th-roots-in-a-range/
 * @difficulty Medium
 * @timeComplexity O(log r)
 * @spaceComplexity O(1)
 *
 * @example
 * countKThRootsInARange(8, 30, 2); // 3
 */
export const countKThRootsInARange = (
	l: number,
	r: number,
	k: number,
): number => {
	/** How many non-negative integers have a k-th power at most n. */
	const atMost = (n: number): number => {
		if (n < 0) return 0;
		let x = Math.floor(n ** (1 / k));
		while (x > 0 && x ** k > n) x--;
		while ((x + 1) ** k <= n) x++;
		return x + 1;
	};
	return atMost(r) - atMost(l - 1);
};
