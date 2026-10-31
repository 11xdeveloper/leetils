/**
 * 2200. Find All K-Distant Indices in an Array
 *
 * Returns, ascending, the indices within `k` of some index holding `key`.
 *
 * Sweep left to right, extending coverage from each occurrence of `key`.
 *
 * @see https://leetcode.com/problems/find-all-k-distant-indices-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * findAllKDistantIndicesInAnArray([3, 4, 9, 1, 3, 9, 5], 9, 1); // [1, 2, 3, 4, 5, 6]
 */
export const findAllKDistantIndicesInAnArray = (
	nums: readonly number[],
	key: number,
	k: number,
): number[] => {
	const indices: number[] = [];
	let next = 0;
	for (const [j, num] of nums.entries()) {
		if (num !== key) continue;
		for (
			let i = Math.max(next, j - k);
			i <= Math.min(nums.length - 1, j + k);
			i++
		)
			indices.push(i);
		next = Math.max(next, j + k + 1);
	}
	return indices;
};
