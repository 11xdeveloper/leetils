/**
 * 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum
 *
 * Returns the smallest total length of two non-overlapping subarrays of the
 * positive `arr` that each sum to `target`, or -1.
 *
 * A sliding window finds every subarray summing to `target` (values are
 * positive). `shortest[i]` is the shortest one ending by `i`; each new one
 * pairs with the shortest ending before it starts.
 *
 * @see https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTwoNonOverlappingSubArraysEachWithTargetSum([3, 2, 2, 4, 3], 3); // 2
 */
export const findTwoNonOverlappingSubArraysEachWithTargetSum = (
	arr: readonly number[],
	target: number,
): number => {
	// shortest[i] is the shortest target-sum subarray within arr[0 … i − 1].
	const shortest = new Array<number>(arr.length + 1).fill(Infinity);
	let [start, sum, best] = [0, 0, Infinity];
	arr.forEach((value, end) => {
		sum += value;
		while (sum > target) sum -= arr[start++] ?? 0;
		let length = Infinity;
		if (sum === target) {
			length = end - start + 1;
			best = Math.min(best, length + (shortest[start] ?? Infinity));
		}
		shortest[end + 1] = Math.min(shortest[end] ?? Infinity, length);
	});
	return best === Infinity ? -1 : best;
};
