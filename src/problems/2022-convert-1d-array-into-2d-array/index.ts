/**
 * 2022. Convert 1D Array Into 2D Array
 *
 * Reshapes `original` into `m` rows of `n`, or returns `[]` if the sizes
 * don't match.
 *
 * Slice off one row at a time.
 *
 * @see https://leetcode.com/problems/convert-1d-array-into-2d-array/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * convert1dArrayInto2dArray([1, 2, 3, 4], 2, 2); // [[1, 2], [3, 4]]
 */
export const convert1dArrayInto2dArray = (
	original: readonly number[],
	m: number,
	n: number,
): number[][] =>
	original.length === m * n
		? Array.from({ length: m }, (_, row) =>
				original.slice(row * n, (row + 1) * n),
			)
		: [];
