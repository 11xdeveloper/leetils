/**
 * 3355. Zero Array Transformation I
 *
 * Each query `[l, r]` may decrement any chosen indices in its range by 1.
 * Returns whether the queries can turn `nums` into all zeros.
 *
 * Each index can drop by at most the number of queries covering it, and
 * that's enough; count coverage with a difference array.
 *
 * @see https://leetcode.com/problems/zero-array-transformation-i/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * zeroArrayTransformationI([1, 0, 1], [[0, 2]]); // true
 */
export const zeroArrayTransformationI = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): boolean => {
	const diff = new Int32Array(nums.length + 1);
	for (const [l = 0, r = 0] of queries) {
		diff[l] = (diff[l] ?? 0) + 1;
		diff[r + 1] = (diff[r + 1] ?? 0) - 1;
	}
	let cover = 0;
	return nums.every((num, i) => {
		cover += diff[i] ?? 0;
		return cover >= num;
	});
};
