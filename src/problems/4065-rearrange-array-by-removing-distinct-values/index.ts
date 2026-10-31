/**
 * 4065. Rearrange Array by Removing Distinct Values
 *
 * Repeatedly take one copy of every distinct value left in `nums`, in
 * increasing order, until none remain. Returns everything taken, in order.
 *
 * Round r takes the values with more than r copies.
 *
 * @see https://leetcode.com/problems/rearrange-array-by-removing-distinct-values/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeArrayByRemovingDistinctValues([7, 7, 4, 4, 4]); // [4, 7, 4, 7, 4]
 */
export const rearrangeArrayByRemovingDistinctValues = (
	nums: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	for (const x of nums) counts.set(x, (counts.get(x) ?? 0) + 1);
	const values = [...counts.keys()].sort((a, b) => a - b);
	const result: number[] = [];
	for (let round = 0; result.length < nums.length; round++)
		for (const v of values) if ((counts.get(v) ?? 0) > round) result.push(v);
	return result;
};
