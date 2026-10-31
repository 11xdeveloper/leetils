/**
 * 3038. Maximum Number of Operations With the Same Score I
 *
 * Repeatedly remove the first two elements of `nums`, scoring their sum.
 * Returns how many removals can be made while every score is the same.
 *
 * The first pair fixes the score; count pairs from the front until one
 * differs.
 *
 * @see https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfOperationsWithTheSameScoreI([3, 2, 1, 4, 5]); // 2
 */
export const maximumNumberOfOperationsWithTheSameScoreI = (
	nums: readonly number[],
): number => {
	const score = (nums[0] ?? 0) + (nums[1] ?? 0);
	let operations = 0;
	for (
		let i = 0;
		i + 1 < nums.length && (nums[i] ?? 0) + (nums[i + 1] ?? 0) === score;
		i += 2
	)
		operations++;
	return operations;
};
