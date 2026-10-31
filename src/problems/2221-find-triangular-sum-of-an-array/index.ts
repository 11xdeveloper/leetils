/**
 * 2221. Find Triangular Sum of an Array
 *
 * Repeatedly replaces the digits with the sums of neighbours mod 10 until
 * one remains, and returns it.
 *
 * Simulate the triangle.
 *
 * @see https://leetcode.com/problems/find-triangular-sum-of-an-array/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * findTriangularSumOfAnArray([1, 2, 3, 4, 5]); // 8
 */
export const findTriangularSumOfAnArray = (nums: readonly number[]): number => {
	let row = [...nums];
	while (row.length > 1)
		row = row.slice(1).map((value, i) => ((row[i] ?? 0) + value) % 10);
	return row[0] ?? 0;
};
