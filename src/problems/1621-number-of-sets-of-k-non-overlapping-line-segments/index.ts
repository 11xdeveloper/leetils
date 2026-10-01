/**
 * 1621. Number of Sets of K Non-Overlapping Line Segments
 *
 * Counts the ways to draw `k` non-overlapping segments (they may share
 * endpoints) between integer points `0 … n − 1`, modulo 10^9 + 7.
 *
 * Shared endpoints can be split apart by adding `k − 1` extra points, which
 * turns the problem into choosing `2k` distinct endpoints among
 * `n + k − 1`: the answer is `C(n + k − 1, 2k)`.
 *
 * @see https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/
 * @difficulty Medium
 * @timeComplexity O(k) big-number multiplications
 * @spaceComplexity O(n) digits
 *
 * @example
 * numberOfSetsOfKNonOverlappingLineSegments(4, 2); // 5
 */
export const numberOfSetsOfKNonOverlappingLineSegments = (
	n: number,
	k: number,
): number => {
	const total = BigInt(n + k - 1);
	let result = 1n;
	for (let i = 1n; i <= BigInt(2 * k); i++)
		result = (result * (total - i + 1n)) / i;
	return Number(result % 1_000_000_007n);
};
