/**
 * 1. Two Sum
 *
 * Returns the indices of the two numbers in `nums` that add up to `target`.
 * Exactly one solution exists, and the same element can't be used twice.
 *
 * Remembers the index of every number seen so far, so each number's
 * complement can be looked up in constant time.
 *
 * @see https://leetcode.com/problems/two-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * twoSum([2, 7, 11, 15], 9); // [0, 1]
 */
export const twoSum = (nums: readonly number[], target: number): number[] => {
	const seen = new Map<number, number>();

	for (const [i, num] of nums.entries()) {
		const j = seen.get(target - num);
		if (j !== undefined) return [j, i];
		seen.set(num, i);
	}

	return [];
};
