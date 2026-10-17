/**
 * 2025. Maximum Number of Ways to Partition an Array
 *
 * A pivot `p` (1 ≤ p < n) partitions `nums` when the sums before and from
 * it are equal. Returns the most pivots possible after changing at most
 * one element to `k`.
 *
 * Pivot `p` needs `total - 2 · prefix[p] = 0`. Changing `nums[i]` by `d`
 * adds `d` to that gap for pivots at or before `i` and subtracts `d` for
 * pivots after it. Keep counts of the gaps on each side of `i`, and for
 * each `i` count the gaps of `-d` before it and `d` after it.
 *
 * @see https://leetcode.com/problems/maximum-number-of-ways-to-partition-an-array/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfWaysToPartitionAnArray([2, -1, 2], 3); // 1
 */
export const maximumNumberOfWaysToPartitionAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const total = nums.reduce((sum, v) => sum + v, 0);
	const gaps: number[] = [];
	let prefix = 0;
	for (let p = 1; p < n; p++) {
		prefix += nums[p - 1] ?? 0;
		gaps.push(total - 2 * prefix);
	}

	const before = new Map<number, number>();
	const after = new Map<number, number>();
	for (const gap of gaps) after.set(gap, (after.get(gap) ?? 0) + 1);
	let best = after.get(0) ?? 0;
	for (const [i, num] of nums.entries()) {
		const d = k - num;
		best = Math.max(best, (before.get(-d) ?? 0) + (after.get(d) ?? 0));
		// Pivot i + 1 moves from after element i's position to before it.
		const gap = gaps[i];
		if (gap !== undefined) {
			after.set(gap, (after.get(gap) ?? 0) - 1);
			before.set(gap, (before.get(gap) ?? 0) + 1);
		}
	}
	return best;
};
