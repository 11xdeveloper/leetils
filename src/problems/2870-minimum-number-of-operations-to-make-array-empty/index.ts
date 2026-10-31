/**
 * 2870. Minimum Number of Operations to Make Array Empty
 *
 * Each operation deletes two or three equal elements. Returns the fewest
 * operations to empty `nums`, or -1 if that's impossible.
 *
 * A value appearing once can't go; any other count `c` takes `⌈c / 3⌉`
 * operations, swapping a triple for two pairs where needed.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeArrayEmpty([2, 3, 3, 2, 2, 4, 2, 3, 4]); // 4
 */
export const minimumNumberOfOperationsToMakeArrayEmpty = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let operations = 0;
	for (const count of counts.values()) {
		if (count === 1) return -1;
		operations += Math.ceil(count / 3);
	}
	return operations;
};
