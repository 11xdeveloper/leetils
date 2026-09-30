/**
 * 985. Sum of Even Numbers After Queries
 *
 * Each query `[val, index]` adds `val` to `nums[index]`. Returns, after
 * each query, the sum of the even values of `nums`.
 *
 * Keeps the running even sum: before a change, the old value is removed
 * from it if even; after, the new value is added if even. Works on a copy.
 *
 * @see https://leetcode.com/problems/sum-of-even-numbers-after-queries/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfEvenNumbersAfterQueries([1, 2, 3, 4], [[1, 0], [-3, 1], [-4, 0], [2, 3]]); // [8, 6, 2, 4]
 */
export const sumOfEvenNumbersAfterQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const values = [...nums];
	let evenSum = values
		.filter((value) => value % 2 === 0)
		.reduce((a, b) => a + b, 0);
	return queries.map(([val = 0, index = 0]) => {
		const before = values[index] ?? 0;
		if (before % 2 === 0) evenSum -= before;
		const after = before + val;
		values[index] = after;
		if (after % 2 === 0) evenSum += after;
		return evenSum;
	});
};
