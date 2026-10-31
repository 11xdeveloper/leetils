/**
 * 3609. Minimum Moves to Reach Target in Grid
 *
 * From (x, y) with m = max(x, y), move to (x + m, y) or (x, y + m).
 * Returns the fewest moves from (sx, sy) to (tx, ty), or -1.
 *
 * Work backwards: when x > y the previous point is forced, (x / 2, y) if
 * x ≥ 2y (x must be even) or (x - y, y) otherwise. Only x = y branches, to
 * (0, x) or (x, 0). The sum shrinks by at least a third each step.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid/
 * @difficulty Hard
 * @timeComplexity O(log(tx + ty))
 * @spaceComplexity O(log(tx + ty))
 *
 * @example
 * minimumMovesToReachTargetInGrid(1, 2, 5, 4); // 2
 */
export const minimumMovesToReachTargetInGrid = (
	sx: number,
	sy: number,
	tx: number,
	ty: number,
): number => {
	const back = (x: number, y: number): number => {
		if (x === sx && y === sy) return 0;
		if (x < sx || y < sy || (x === 0 && y === 0))
			return Number.POSITIVE_INFINITY;
		if (x === y) return 1 + Math.min(back(0, y), back(x, 0));
		const [big, small] = x > y ? [x, y] : [y, x];
		let previous: number;
		if (big >= 2 * small) {
			if (big % 2 === 1) return Number.POSITIVE_INFINITY;
			previous = big / 2;
		} else previous = big - small;
		return 1 + (x > y ? back(previous, y) : back(x, previous));
	};
	const moves = back(tx, ty);
	return moves === Number.POSITIVE_INFINITY ? -1 : moves;
};
