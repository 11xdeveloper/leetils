/**
 * 3010. Divide an Array Into Subarrays With Minimum Cost I
 *
 * Split `nums` into three contiguous subarrays, where a subarray costs its
 * first element. Returns the smallest total cost.
 *
 * The first subarray always starts with `nums[0]`, and the other two can
 * start at any two later positions, so add the two smallest later elements.
 *
 * @see https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * divideAnArrayIntoSubarraysWithMinimumCostI([1, 2, 3, 12]); // 6
 */
export const divideAnArrayIntoSubarraysWithMinimumCostI = (
	nums: readonly number[],
): number => {
	let first = Number.POSITIVE_INFINITY;
	let second = Number.POSITIVE_INFINITY;
	for (let i = 1; i < nums.length; i++) {
		const num = nums[i] ?? 0;
		if (num < first) [first, second] = [num, first];
		else if (num < second) second = num;
	}
	return (nums[0] ?? 0) + first + second;
};
