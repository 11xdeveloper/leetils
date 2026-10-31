/**
 * 3678. Smallest Absent Positive Greater Than Average
 *
 * The smallest positive integer above the average of `nums` that isn't in
 * `nums`.
 *
 * @see https://leetcode.com/problems/smallest-absent-positive-greater-than-average/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestAbsentPositiveGreaterThanAverage([3, 5]); // 6
 */
export const smallestAbsentPositiveGreaterThanAverage = (
	nums: readonly number[],
): number => {
	const present = new Set(nums);
	const average = nums.reduce((a, b) => a + b, 0) / nums.length;
	let x = Math.max(1, Math.floor(average) + 1);
	while (present.has(x)) x++;
	return x;
};
