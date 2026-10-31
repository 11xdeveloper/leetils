/**
 * 2294. Partition Array Such That Maximum Difference Is K
 *
 * Splits `nums` into the fewest subsequences whose maximum and minimum
 * differ by at most `k`.
 *
 * Sort, and start a new group whenever a value is over `k` above the
 * current group's smallest.
 *
 * @see https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArraySuchThatMaximumDifferenceIsK([3, 6, 1, 2, 5], 2); // 2
 */
export const partitionArraySuchThatMaximumDifferenceIsK = (
	nums: readonly number[],
	k: number,
): number => {
	let [groups, start] = [0, -Infinity];
	for (const num of nums.toSorted((a, b) => a - b)) {
		if (num - start <= k) continue;
		groups++;
		start = num;
	}
	return groups;
};
