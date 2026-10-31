/**
 * 3819. Rotate Non Negative Elements
 *
 * Rotates the non-negative elements of `nums` left by `k` among their own
 * positions, leaving negative elements where they are.
 *
 * @see https://leetcode.com/problems/rotate-non-negative-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rotateNonNegativeElements([5, 4, -9, 6], 2); // [6, 5, -9, 4]
 */
export const rotateNonNegativeElements = (
	nums: readonly number[],
	k: number,
): number[] => {
	const kept = nums.filter((num) => num >= 0);
	const shift = kept.length > 0 ? k % kept.length : 0;
	let next = shift;
	return nums.map((num) => {
		if (num < 0) return num;
		const value = kept[next] ?? 0;
		next = (next + 1) % kept.length;
		return value;
	});
};
