/**
 * 3427. Sum of Variable Length Subarrays
 *
 * For each index i, add up `nums` from `max(0, i - nums[i])` to i, and
 * return the total over all i.
 *
 * Use prefix sums for each range.
 *
 * @see https://leetcode.com/problems/sum-of-variable-length-subarrays/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfVariableLengthSubarrays([2, 3, 1]); // 11
 */
export const sumOfVariableLengthSubarrays = (
	nums: readonly number[],
): number => {
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	return nums.reduce(
		(total, num, i) =>
			total + (prefix[i + 1] ?? 0) - (prefix[Math.max(0, i - num)] ?? 0),
		0,
	);
};
