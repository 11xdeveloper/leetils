/**
 * 2971. Find Polygon With the Largest Perimeter
 *
 * Sides form a polygon when there are at least three and the longest is
 * shorter than the rest combined. Returns the largest perimeter a subset
 * of `nums` can form, or -1.
 *
 * Sort; for each candidate longest side, use every smaller side too, and
 * take the largest prefix that works.
 *
 * @see https://leetcode.com/problems/find-polygon-with-the-largest-perimeter/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findPolygonWithTheLargestPerimeter([1, 12, 1, 2, 5, 50, 3]); // 12
 */
export const findPolygonWithTheLargestPerimeter = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = -1;
	let sum = 0;
	for (const [i, side] of sorted.entries()) {
		if (i >= 2 && sum > side) best = sum + side;
		sum += side;
	}
	return best;
};
