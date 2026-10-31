/**
 * 3356. Zero Array Transformation II
 *
 * Each query `[l, r, val]` may decrement each index in its range by up to
 * `val`. Returns the fewest queries, taken in order from the first, that
 * can turn `nums` into all zeros, or -1.
 *
 * Sweep the indices, keeping a difference array of the queries used so
 * far; whenever an index isn't covered enough, apply the next query.
 * Queries ending before the current index do nothing for it but still
 * count, since they come first.
 *
 * @see https://leetcode.com/problems/zero-array-transformation-ii/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * zeroArrayTransformationII([2, 0, 2], [[0, 2, 1], [0, 2, 1], [1, 1, 3]]); // 2
 */
export const zeroArrayTransformationII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	const diff = new Float64Array(nums.length + 1);
	let used = 0;
	let cover = 0;
	for (let i = 0; i < nums.length; i++) {
		while (cover + (diff[i] ?? 0) < (nums[i] ?? 0)) {
			if (used === queries.length) return -1;
			const [l = 0, r = 0, val = 0] = queries[used++] ?? [];
			if (r < i) continue;
			diff[Math.max(l, i)] = (diff[Math.max(l, i)] ?? 0) + val;
			diff[r + 1] = (diff[r + 1] ?? 0) - val;
		}
		cover += diff[i] ?? 0;
	}
	return used;
};
