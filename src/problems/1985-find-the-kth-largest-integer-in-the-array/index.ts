/**
 * 1985. Find the Kth Largest Integer in the Array
 *
 * `nums` holds integers as strings without leading zeros (up to 100
 * digits). Returns the `k`-th largest, counting duplicates.
 *
 * Sort by length, then lexicographically, which orders such strings
 * numerically.
 *
 * @see https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/
 * @difficulty Medium
 * @timeComplexity O(n log n · L) for digit length L
 * @spaceComplexity O(n)
 *
 * @example
 * findTheKthLargestIntegerInTheArray(["2", "21", "12", "1"], 3); // "2"
 */
export const findTheKthLargestIntegerInTheArray = (
	nums: readonly string[],
	k: number,
): string =>
	nums.toSorted((a, b) => b.length - a.length || (a < b ? 1 : a > b ? -1 : 0))[
		k - 1
	] ?? "";
