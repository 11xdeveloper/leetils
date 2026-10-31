/**
 * 3595. Once Twice
 *
 * In `nums`, every value appears three times except one that appears once
 * and one that appears twice. Returns `[once, twice]`.
 *
 * Count occurrences.
 *
 * @see https://leetcode.com/problems/once-twice/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * onceTwice([2, 2, 3, 2, 5, 5, 5, 7, 7]); // [3, 7]
 */
export const onceTwice = (nums: readonly number[]): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const result = [0, 0];
	for (const [value, count] of counts) if (count < 3) result[count - 1] = value;
	return result;
};
