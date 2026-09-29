/**
 * 581. Shortest Unsorted Continuous Subarray
 *
 * Returns the length of the shortest subarray which, if sorted, makes the
 * whole of `nums` sorted in ascending order.
 *
 * An element must be inside the subarray if something before it is larger
 * or something after it is smaller. A left-to-right pass with the running
 * maximum finds the last such element; a right-to-left pass with the
 * running minimum finds the first.
 *
 * @see https://leetcode.com/problems/shortest-unsorted-continuous-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestUnsortedContinuousSubarray([2, 6, 4, 8, 10, 9, 15]); // 5
 */
export const shortestUnsortedContinuousSubarray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let end = -1;
	let start = 0;
	let max = Number.NEGATIVE_INFINITY;
	let min = Number.POSITIVE_INFINITY;

	for (let i = 0; i < n; i++) {
		const forward = nums[i] ?? 0;
		if (forward < max) end = i;
		else max = forward;

		const backward = nums[n - 1 - i] ?? 0;
		if (backward > min) start = n - 1 - i;
		else min = backward;
	}

	return end === -1 ? 0 : end - start + 1;
};
