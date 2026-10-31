/**
 * 3424. Minimum Cost to Make Arrays Identical
 *
 * Turn `arr` into `brr` by changing elements (costing the amount changed),
 * optionally after splitting `arr` into pieces and rearranging them, which
 * costs `k`. Returns the smallest cost.
 *
 * Rearranging can achieve any order, and then pairing both arrays sorted is
 * cheapest. Compare that plus `k` with matching the arrays as they are.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-arrays-identical/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToMakeArraysIdentical([-7, 9, 5], [7, -2, -5], 2); // 13
 */
export const minimumCostToMakeArraysIdentical = (
	arr: readonly number[],
	brr: readonly number[],
	k: number,
): number => {
	const distance = (a: readonly number[], b: readonly number[]): number =>
		a.reduce((sum, value, i) => sum + Math.abs(value - (b[i] ?? 0)), 0);
	const byValue = (a: number, b: number): number => a - b;
	return Math.min(
		distance(arr, brr),
		k + distance(arr.toSorted(byValue), brr.toSorted(byValue)),
	);
};
