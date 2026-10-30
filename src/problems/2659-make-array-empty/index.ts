/**
 * 2659. Make Array Empty
 *
 * Repeatedly, if the first element of `nums` (distinct values) is the
 * smallest, remove it; otherwise move it to the end. Returns the number
 * of operations until the array is empty.
 *
 * Elements leave in sorted order. Each removal costs one operation, and
 * every time the next smallest sits before the previous one, the scan
 * has wrapped around and rotated past all elements still present.
 *
 * @see https://leetcode.com/problems/make-array-empty/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeArrayEmpty([3, 4, -1]); // 5
 */
export const makeArrayEmpty = (nums: readonly number[]): number => {
	const n = nums.length;
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0));
	let operations = n;
	for (let i = 1; i < n; i++)
		if ((order[i] ?? 0) < (order[i - 1] ?? 0)) operations += n - i;
	return operations;
};
