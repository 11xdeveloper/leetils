/**
 * 2849. Determine if a Cell Is Reachable at a Given Time
 *
 * Each second you must move to one of the 8 neighbouring cells. Returns
 * whether you can be at `(fx, fy)` exactly `t` seconds after `(sx, sy)`.
 *
 * The fewest moves is the Chebyshev distance, and spare seconds can
 * always be wasted, except that staying put for exactly one second is
 * impossible.
 *
 * @see https://leetcode.com/problems/determine-if-a-cell-is-reachable-at-a-given-time/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * determineIfACellIsReachableAtAGivenTime(2, 4, 7, 7, 6); // true
 */
export const determineIfACellIsReachableAtAGivenTime = (
	sx: number,
	sy: number,
	fx: number,
	fy: number,
	t: number,
): boolean => {
	const distance = Math.max(Math.abs(sx - fx), Math.abs(sy - fy));
	return distance === 0 ? t !== 1 : t >= distance;
};
