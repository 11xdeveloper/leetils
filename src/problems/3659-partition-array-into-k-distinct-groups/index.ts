/**
 * 3659. Partition Array Into K-Distinct Groups
 *
 * Whether `nums` splits into groups of exactly `k` distinct elements.
 *
 * It does exactly when k divides the length and no value appears more
 * often than the number of groups: deal sorted values round-robin.
 *
 * @see https://leetcode.com/problems/partition-array-into-k-distinct-groups/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayIntoKDistinctGroups([3, 5, 2, 2], 2); // true
 */
export const partitionArrayIntoKDistinctGroups = (
	nums: readonly number[],
	k: number,
): boolean => {
	if (nums.length % k !== 0) return false;
	const groups = nums.length / k;
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	return [...counts.values()].every((count) => count <= groups);
};
