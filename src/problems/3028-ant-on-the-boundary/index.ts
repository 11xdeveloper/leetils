/**
 * 3028. Ant on the Boundary
 *
 * An ant starts on a boundary and moves left or right by each of `nums` in
 * turn. Returns how many times it lands back on the boundary.
 *
 * Count the prefix sums that are zero.
 *
 * @see https://leetcode.com/problems/ant-on-the-boundary/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * antOnTheBoundary([2, 3, -5]); // 1
 */
export const antOnTheBoundary = (nums: readonly number[]): number => {
	let position = 0;
	let returns = 0;
	for (const num of nums) {
		position += num;
		if (position === 0) returns++;
	}
	return returns;
};
