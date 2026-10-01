/**
 * 370. Range Addition
 *
 * Starting from an array of `length` zeros, applies each update
 * `[start, end, inc]` (adding `inc` to every element from `start` to `end`)
 * and returns the result.
 *
 * Records each update in a difference array, `+inc` at `start` and `-inc`
 * just after `end`, so it costs O(1). A running sum over the difference
 * array then gives the final values.
 *
 * @see https://leetcode.com/problems/range-addition/
 * @difficulty Medium
 * @timeComplexity O(length + updates)
 * @spaceComplexity O(length)
 *
 * @example
 * rangeAddition(5, [[1, 3, 2], [2, 4, 3], [0, 2, -2]]); // [-2, 0, 3, 5, 3]
 */
export const rangeAddition = (
	length: number,
	updates: readonly (readonly number[])[],
): number[] => {
	const result = new Array<number>(length).fill(0);
	for (const [start = 0, end = 0, inc = 0] of updates) {
		result[start] = (result[start] ?? 0) + inc;
		if (end + 1 < length) result[end + 1] = (result[end + 1] ?? 0) - inc;
	}
	for (let i = 1; i < length; i++)
		result[i] = (result[i] ?? 0) + (result[i - 1] ?? 0);
	return result;
};
