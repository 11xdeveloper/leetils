/**
 * 2449. Minimum Number of Operations to Make Arrays Similar
 *
 * An operation adds 2 to one element of `nums` and subtracts 2 from
 * another. Returns the fewest operations to make `nums` a rearrangement of
 * `target` (always possible).
 *
 * Parity never changes, so match odd values with odd and even with even,
 * each in sorted order. Every operation closes 4 units of total gap.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeArraysSimilar([8, 12, 6], [2, 14, 10]); // 2
 */
export const minimumNumberOfOperationsToMakeArraysSimilar = (
	nums: readonly number[],
	target: readonly number[],
): number => {
	const split = (values: readonly number[]): number[] =>
		values.toSorted((a, b) => (a % 2) - (b % 2) || a - b);
	const [from, to] = [split(nums), split(target)];
	let gap = 0;
	for (const [i, value] of from.entries())
		gap += Math.abs(value - (to[i] ?? 0));
	return gap / 4;
};
