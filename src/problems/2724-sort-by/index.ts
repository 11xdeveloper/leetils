/**
 * 2724. Sort By
 *
 * Sort `arr` in ascending order of `fn(element)`, returning a new array.
 *
 * Compare the keys in `toSorted`.
 *
 * @see https://leetcode.com/problems/sort-by/
 * @difficulty Easy
 * @timeComplexity O(n log n) calls of `fn`
 * @spaceComplexity O(n)
 *
 * @example
 * sortBy([5, 4, 1, 2, 3], (x) => x); // [1, 2, 3, 4, 5]
 */
export function sortBy<T>(arr: readonly T[], fn: (item: T) => number): T[] {
	return arr.toSorted((a, b) => fn(a) - fn(b));
}
