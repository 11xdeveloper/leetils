/**
 * 3994. Minimum Adjacent Swaps to Partition Array
 *
 * Elements below `a`, then those from a to `b`, then those above b. The
 * fewest neighbour swaps to arrange `nums` that way, modulo 1e9+7.
 *
 * Keeping each group's order, every pair out of group order needs one
 * swap: count earlier elements of a later group.
 *
 * @see https://leetcode.com/problems/minimum-adjacent-swaps-to-partition-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAdjacentSwapsToPartitionArray([9, 7, 5, 3], 4, 8); // 5
 */
export const minimumAdjacentSwapsToPartitionArray = (
	nums: readonly number[],
	a: number,
	b: number,
): number => {
	const seen = [0, 0, 0];
	let swaps = 0;
	for (const x of nums) {
		const group = x < a ? 0 : x <= b ? 1 : 2;
		for (let later = group + 1; later < 3; later++) swaps += seen[later] ?? 0;
		seen[group] = (seen[group] ?? 0) + 1;
	}
	return swaps % 1_000_000_007;
};
