/**
 * 3195. Find the Minimum Area to Cover All Ones I
 *
 * The area of the smallest axis-aligned rectangle containing every 1 in the
 * grid.
 *
 * Track the extreme rows and columns of the 1s.
 *
 * @see https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMinimumAreaToCoverAllOnesI([[0, 1, 0], [1, 0, 1]]); // 6
 */
export const findTheMinimumAreaToCoverAllOnesI = (
	grid: readonly (readonly number[])[],
): number => {
	let [top, bottom, left, right] = [
		Number.POSITIVE_INFINITY,
		-1,
		Number.POSITIVE_INFINITY,
		-1,
	];
	grid.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell !== 1) return;
			top = Math.min(top, r);
			bottom = Math.max(bottom, r);
			left = Math.min(left, c);
			right = Math.max(right, c);
		});
	});
	return (bottom - top + 1) * (right - left + 1);
};
