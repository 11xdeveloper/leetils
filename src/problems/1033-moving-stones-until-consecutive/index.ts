/**
 * 1033. Moving Stones Until Consecutive
 *
 * Three stones sit at positions `a`, `b`, `c`. A move takes an end stone
 * and places it at an empty position between the other two. Returns
 * `[fewest moves, most moves]` until no move is possible (the stones are
 * consecutive).
 *
 * With sorted positions `x < y < z`: the most moves fill every gap one step
 * at a time, `z - x - 2`. The fewest is 0 if already consecutive, 1 if a
 * gap is at most 1 (one stone jumps next to the pair), else 2.
 *
 * @see https://leetcode.com/problems/moving-stones-until-consecutive/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * movingStonesUntilConsecutive(1, 2, 5); // [1, 2]
 */
export const movingStonesUntilConsecutive = (
	a: number,
	b: number,
	c: number,
): number[] => {
	const [x = 0, y = 0, z = 0] = [a, b, c].sort((p, q) => p - q);
	if (z - x === 2) return [0, 0];
	const fewest = y - x <= 2 || z - y <= 2 ? 1 : 2;
	return [fewest, z - x - 2];
};
