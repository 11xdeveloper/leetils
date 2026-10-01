/**
 * 1122. Relative Sort Array
 *
 * Sorts `arr1` so that values appearing in `arr2` (whose values are distinct)
 * come first, in `arr2`'s order, followed by the rest in ascending order.
 *
 * Counting sort, as values are at most 1000: counts each value in `arr1`,
 * writes out `arr2`'s values in its order, then the remaining values.
 *
 * @see https://leetcode.com/problems/relative-sort-array/
 * @difficulty Easy
 * @timeComplexity O(n + m + k) for values up to k
 * @spaceComplexity O(k)
 *
 * @example
 * relativeSortArray([28, 6, 22, 8, 44, 17], [22, 28, 8, 6]); // [22, 28, 8, 6, 17, 44]
 */
export const relativeSortArray = (
	arr1: readonly number[],
	arr2: readonly number[],
): number[] => {
	const counts = new Array<number>(Math.max(0, ...arr1) + 1).fill(0);
	for (const value of arr1) counts[value] = (counts[value] ?? 0) + 1;
	const result: number[] = [];
	const writeAll = (value: number) => {
		for (let i = 0; i < (counts[value] ?? 0); i++) result.push(value);
		counts[value] = 0;
	};
	for (const value of arr2) writeAll(value);
	for (let value = 0; value < counts.length; value++) writeAll(value);
	return result;
};
