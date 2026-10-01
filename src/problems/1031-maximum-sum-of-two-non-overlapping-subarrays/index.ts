/**
 * 1031. Maximum Sum of Two Non-Overlapping Subarrays
 *
 * Returns the largest total of two non-overlapping subarrays of `nums`, one
 * of length `firstLen` and one of length `secondLen`, in either order.
 *
 * For each position of the right-hand window, pairs it with the best
 * window of the other length ending before it, trying both orders. Prefix
 * sums give each window's sum.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfTwoNonOverlappingSubarrays([0, 6, 5, 2, 2, 5, 1, 9, 4], 1, 2); // 20
 */
export const maximumSumOfTwoNonOverlappingSubarrays = (
	nums: readonly number[],
	firstLen: number,
	secondLen: number,
): number => {
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const window = (end: number, length: number): number =>
		(prefix[end] ?? 0) - (prefix[end - length] ?? 0);

	const best = (leftLen: number, rightLen: number): number => {
		let bestLeft = Number.NEGATIVE_INFINITY;
		let result = Number.NEGATIVE_INFINITY;
		for (let end = leftLen + rightLen; end <= nums.length; end++) {
			bestLeft = Math.max(bestLeft, window(end - rightLen, leftLen));
			result = Math.max(result, bestLeft + window(end, rightLen));
		}
		return result;
	};
	return Math.max(best(firstLen, secondLen), best(secondLen, firstLen));
};
