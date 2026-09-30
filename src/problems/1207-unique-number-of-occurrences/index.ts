/**
 * 1207. Unique Number of Occurrences
 *
 * Returns whether no two distinct values in `arr` appear the same number of
 * times.
 *
 * Counts each value, then checks the counts are all different.
 *
 * @see https://leetcode.com/problems/unique-number-of-occurrences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * uniqueNumberOfOccurrences([1, 2, 2, 1, 1, 3]); // true
 */
export const uniqueNumberOfOccurrences = (arr: readonly number[]): boolean => {
	const counts = new Map<number, number>();
	for (const value of arr) counts.set(value, (counts.get(value) ?? 0) + 1);
	return new Set(counts.values()).size === counts.size;
};
