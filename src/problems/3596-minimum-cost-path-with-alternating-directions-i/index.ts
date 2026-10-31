/**
 * 3596. Minimum Cost Path with Alternating Directions I
 *
 * Start at the top-left cell of an m × n grid, where entering cell (i, j)
 * costs (i + 1)(j + 1), including the start. Odd-numbered moves go right
 * or down and even-numbered ones left or up. Returns the least cost to
 * reach the bottom-right cell, or -1.
 *
 * Each pair of moves leaves row + column unchanged, so only targets at
 * most one step away are reachable: 1 for a single cell, 3 for 1 × 2 or
 * 2 × 1.
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-alternating-directions-i/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostPathWithAlternatingDirectionsI(2, 1); // 3
 */
export const minimumCostPathWithAlternatingDirectionsI = (
	m: number,
	n: number,
): number => {
	if (m === 1 && n === 1) return 1;
	if (m + n === 3) return 3;
	return -1;
};
