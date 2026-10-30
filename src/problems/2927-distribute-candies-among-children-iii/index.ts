/**
 * 2927. Distribute Candies Among Children III
 *
 * Returns the number of ways to give `n` candies to three children with
 * none getting more than `limit`, for values too large to loop over.
 *
 * Inclusion–exclusion on children over the limit: `Σ (-1)^i C(3, i) ·
 * C(n - i(limit + 1) + 2, 2)`. The terms pass 2⁵³, so use BigInt.
 *
 * @see https://leetcode.com/problems/distribute-candies-among-children-iii/
 * @difficulty Hard
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * distributeCandiesAmongChildrenIII(5, 2); // 3
 */
export const distributeCandiesAmongChildrenIII = (
	n: number,
	limit: number,
): number => {
	const pairs = (m: bigint): bigint =>
		m < 0n ? 0n : ((m + 2n) * (m + 1n)) / 2n;
	const total = BigInt(n);
	const over = BigInt(limit + 1);
	return Number(
		pairs(total) -
			3n * pairs(total - over) +
			3n * pairs(total - 2n * over) -
			pairs(total - 3n * over),
	);
};
