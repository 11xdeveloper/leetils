/**
 * 1051. Height Checker
 *
 * Students should stand in non-decreasing order of height. Returns how many
 * are standing where a student of a different height belongs.
 *
 * Compares the heights with a sorted copy.
 *
 * @see https://leetcode.com/problems/height-checker/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * heightChecker([1, 1, 4, 2, 1, 3]); // 3
 */
export const heightChecker = (heights: readonly number[]): number => {
	const expected = heights.toSorted((a, b) => a - b);
	return heights.filter((height, i) => height !== expected[i]).length;
};
