/**
 * 2295. Replace Elements in an Array
 *
 * Applies operations `[old, new]` replacing the value `old` (always
 * present, values distinct) with `new`. Returns the final array.
 *
 * Track each value's index.
 *
 * @see https://leetcode.com/problems/replace-elements-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * replaceElementsInAnArray([1, 2, 4, 6], [[1, 3], [4, 7], [6, 1]]); // [3, 2, 7, 1]
 */
export const replaceElementsInAnArray = (
	nums: readonly number[],
	operations: readonly (readonly number[])[],
): number[] => {
	const result = [...nums];
	const index = new Map(nums.map((num, i) => [num, i]));
	for (const [from = 0, to = 0] of operations) {
		const i = index.get(from) ?? 0;
		index.delete(from);
		index.set(to, i);
		result[i] = to;
	}
	return result;
};
