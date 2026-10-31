/**
 * 3434. Maximum Frequency After Subarray Operation
 *
 * Add one integer x to every element of a chosen subarray. Returns the most
 * elements that can then equal `k`.
 *
 * Values are at most 50. For each value v, turning the subarray's v's into
 * k gains a point per v and loses one per k already there, so the best
 * subarray is a maximum-sum run found with Kadane's algorithm.
 *
 * @see https://leetcode.com/problems/maximum-frequency-after-subarray-operation/
 * @difficulty Medium
 * @timeComplexity O(50 n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumFrequencyAfterSubarrayOperation([1, 2, 3, 4, 5, 6], 1); // 2
 */
export const maximumFrequencyAfterSubarrayOperation = (
	nums: readonly number[],
	k: number,
): number => {
	const already = nums.filter((num) => num === k).length;
	let bestGain = 0;
	for (let v = 1; v <= 50; v++) {
		if (v === k) continue;
		let current = 0;
		for (const num of nums) {
			current = Math.max(0, current + (num === v ? 1 : num === k ? -1 : 0));
			bestGain = Math.max(bestGain, current);
		}
	}
	return already + bestGain;
};
