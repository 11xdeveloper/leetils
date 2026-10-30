/**
 * 2610. Convert an Array Into a 2D Array With Conditions
 *
 * Splits `nums` into as few rows as possible, each holding distinct
 * values, using every element once. Returns the rows.
 *
 * A value's `k`-th occurrence goes into row `k`, so the row count is the
 * highest frequency.
 *
 * @see https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * convertAnArrayIntoA2dArrayWithConditions([1, 3, 4, 1, 2, 3, 1]); // [[1, 3, 4, 2], [1, 3], [1]]
 */
export const convertAnArrayIntoA2dArrayWithConditions = (
	nums: readonly number[],
): number[][] => {
	const seen = new Map<number, number>();
	const rows: number[][] = [];
	for (const num of nums) {
		const row = seen.get(num) ?? 0;
		seen.set(num, row + 1);
		if (row === rows.length) rows.push([]);
		rows[row]?.push(num);
	}
	return rows;
};
