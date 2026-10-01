/**
 * 1785. Minimum Elements to Add to Form a Given Sum
 *
 * Returns the fewest elements with `|value| ≤ limit` to add to `nums` so
 * its sum becomes `goal`.
 *
 * Each added element closes at most `limit` of the gap.
 *
 * @see https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumElementsToAddToFormAGivenSum([1, -1, 1], 3, -4); // 2
 */
export const minimumElementsToAddToFormAGivenSum = (
	nums: readonly number[],
	limit: number,
	goal: number,
): number => {
	const sum = nums.reduce((total, num) => total + num, 0);
	return Math.ceil(Math.abs(goal - sum) / limit);
};
