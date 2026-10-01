/**
 * 1481. Least Number of Unique Integers after K Removals
 *
 * Returns the fewest distinct values left in `arr` after removing exactly
 * `k` elements.
 *
 * Removes whole values starting with the rarest, while `k` covers them.
 *
 * @see https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * leastNumberOfUniqueIntegersAfterKRemovals([4, 3, 1, 1, 3, 3, 2], 3); // 2
 */
export const leastNumberOfUniqueIntegersAfterKRemovals = (
	arr: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	for (const value of arr) counts.set(value, (counts.get(value) ?? 0) + 1);
	const sorted = [...counts.values()].sort((a, b) => a - b);
	let [left, removed] = [k, 0];
	for (const count of sorted) {
		if (count > left) break;
		left -= count;
		removed++;
	}
	return sorted.length - removed;
};
