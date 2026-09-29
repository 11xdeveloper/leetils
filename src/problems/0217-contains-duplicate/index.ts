/**
 * 217. Contains Duplicate
 *
 * Returns whether any value appears more than once in `nums`.
 *
 * Adds each number to a set and stops at the first one already in it.
 *
 * @see https://leetcode.com/problems/contains-duplicate/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * containsDuplicate([1, 2, 3, 1]); // true
 * containsDuplicate([1, 2, 3, 4]); // false
 */
export const containsDuplicate = (nums: readonly number[]): boolean => {
	const seen = new Set<number>();

	for (const num of nums) {
		if (seen.has(num)) return true;
		seen.add(num);
	}

	return false;
};
