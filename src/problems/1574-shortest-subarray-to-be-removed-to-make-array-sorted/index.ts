/**
 * 1574. Shortest Subarray to be Removed to Make Array Sorted
 *
 * Returns the length of the shortest subarray whose removal leaves `arr`
 * non-decreasing.
 *
 * What's kept is a sorted prefix joined to a sorted suffix. Find the
 * longest sorted prefix and suffix, then slide a pointer through the prefix
 * while a second pointer finds the first suffix element it can join.
 *
 * @see https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestSubarrayToBeRemovedToMakeArraySorted([1, 2, 3, 10, 4, 2, 3, 5]); // 3
 */
export const shortestSubarrayToBeRemovedToMakeArraySorted = (
	arr: readonly number[],
): number => {
	const n = arr.length;
	let prefixEnd = 0;
	while (
		prefixEnd + 1 < n &&
		(arr[prefixEnd] ?? 0) <= (arr[prefixEnd + 1] ?? 0)
	)
		prefixEnd++;
	if (prefixEnd === n - 1) return 0;
	let suffixStart = n - 1;
	while (
		suffixStart > 0 &&
		(arr[suffixStart - 1] ?? 0) <= (arr[suffixStart] ?? 0)
	)
		suffixStart--;
	let shortest = Math.min(n - prefixEnd - 1, suffixStart);
	for (let i = 0, j = suffixStart; i <= prefixEnd; i++) {
		while (j < n && (arr[j] ?? 0) < (arr[i] ?? 0)) j++;
		shortest = Math.min(shortest, j - i - 1);
	}
	return shortest;
};
