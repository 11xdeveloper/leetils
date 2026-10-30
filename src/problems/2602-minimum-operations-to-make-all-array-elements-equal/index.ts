/**
 * 2602. Minimum Operations to Make All Array Elements Equal
 *
 * For each query `q`, returns how many increments and decrements by 1
 * it takes to make every element of `nums` equal `q`, which is the sum of
 * `|nums[i] - q|`.
 *
 * Sort and take prefix sums; binary search where `q` falls, then the
 * elements below and above contribute in bulk.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal/
 * @difficulty Medium
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeAllArrayElementsEqual([3, 1, 6, 8], [1, 5]); // [14, 10]
 */
export const minimumOperationsToMakeAllArrayElementsEqual = (
	nums: readonly number[],
	queries: readonly number[],
): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	const prefix = [0];
	for (const num of sorted) prefix.push((prefix.at(-1) ?? 0) + num);
	return queries.map((q) => {
		let low = 0;
		let high = n;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((sorted[mid] ?? 0) < q) low = mid + 1;
			else high = mid;
		}
		const below = prefix[low] ?? 0;
		const above = (prefix[n] ?? 0) - below;
		return q * low - below + above - q * (n - low);
	});
};
