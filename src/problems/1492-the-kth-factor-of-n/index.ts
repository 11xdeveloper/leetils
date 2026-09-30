/**
 * 1492. The kth Factor of n
 *
 * Returns the `k`th smallest factor of `n`, or -1 if it has fewer.
 *
 * Factors come in pairs `d` and `n / d` around `√n`, so it lists the small
 * ones up to the square root and reads the large ones off in reverse.
 *
 * @see https://leetcode.com/problems/the-kth-factor-of-n/
 * @difficulty Medium
 * @timeComplexity O(√n)
 * @spaceComplexity O(√n)
 *
 * @example
 * theKthFactorOfN(12, 3); // 3
 */
export const theKthFactorOfN = (n: number, k: number): number => {
	const small: number[] = [];
	for (let d = 1; d * d <= n; d++) if (n % d === 0) small.push(d);
	if (k <= small.length) return small[k - 1] ?? -1;
	const square = (small.at(-1) ?? 0) ** 2 === n;
	const large = small.map((d) => n / d).reverse();
	return large[k - small.length - 1 + (square ? 1 : 0)] ?? -1;
};
