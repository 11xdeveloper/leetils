/**
 * 3159. Find Occurrences of an Element in an Array
 *
 * For each query q, the index of the q-th occurrence of `x` in `nums`, or
 * -1 if there are fewer.
 *
 * List the occurrences once, then look each query up.
 *
 * @see https://leetcode.com/problems/find-occurrences-of-an-element-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * findOccurrencesOfAnElementInAnArray([1, 3, 1, 7], [1, 3, 2, 4], 1); // [0, -1, 2, -1]
 */
export const findOccurrencesOfAnElementInAnArray = (
	nums: readonly number[],
	queries: readonly number[],
	x: number,
): number[] => {
	const positions: number[] = [];
	nums.forEach((num, i) => {
		if (num === x) positions.push(i);
	});
	return queries.map((q) => positions[q - 1] ?? -1);
};
