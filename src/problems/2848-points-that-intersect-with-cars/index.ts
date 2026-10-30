/**
 * 2848. Points That Intersect With Cars
 *
 * Each car covers the integer points from its start to its end. Returns
 * how many integer points some car covers.
 *
 * Mark covered points; coordinates are at most 100.
 *
 * @see https://leetcode.com/problems/points-that-intersect-with-cars/
 * @difficulty Easy
 * @timeComplexity O(n · 100)
 * @spaceComplexity O(100)
 *
 * @example
 * pointsThatIntersectWithCars([[3, 6], [1, 5], [4, 7]]); // 7
 */
export const pointsThatIntersectWithCars = (
	nums: readonly (readonly number[])[],
): number => {
	const covered = new Set<number>();
	for (const [start = 0, end = 0] of nums)
		for (let p = start; p <= end; p++) covered.add(p);
	return covered.size;
};
