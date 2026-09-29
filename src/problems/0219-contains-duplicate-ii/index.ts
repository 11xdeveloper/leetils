/**
 * 219. Contains Duplicate II
 *
 * Returns whether `nums` has two equal values at indices at most `k` apart.
 *
 * Remembers the last index of each value; a repeat within `k` of it is a
 * match.
 *
 * @see https://leetcode.com/problems/contains-duplicate-ii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * containsDuplicateII([1, 2, 3, 1], 3); // true
 * containsDuplicateII([1, 2, 3, 1, 2, 3], 2); // false
 */
export const containsDuplicateII = (
	nums: readonly number[],
	k: number,
): boolean => {
	const lastIndex = new Map<number, number>();

	for (const [i, num] of nums.entries()) {
		const previous = lastIndex.get(num);
		if (previous !== undefined && i - previous <= k) return true;
		lastIndex.set(num, i);
	}

	return false;
};
