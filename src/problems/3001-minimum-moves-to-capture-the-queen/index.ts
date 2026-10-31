/**
 * 3001. Minimum Moves to Capture The Queen
 *
 * On an 8 × 8 board, a white rook at `(a, b)` and white bishop at `(c, d)`
 * try to capture the black queen at `(e, f)`, which doesn't move. Returns
 * the fewest white moves needed.
 *
 * The answer is never more than 2, since the rook can always line up with
 * the queen and then take it. It's 1 when the rook shares the queen's row or
 * column without the bishop in between, or the bishop shares a diagonal
 * without the rook in between.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-capture-the-queen/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToCaptureTheQueen(1, 1, 8, 8, 2, 3); // 2
 * minimumMovesToCaptureTheQueen(5, 3, 3, 4, 5, 2); // 1
 */
export const minimumMovesToCaptureTheQueen = (
	a: number,
	b: number,
	c: number,
	d: number,
	e: number,
	f: number,
): number => {
	const between = (p: number, q: number, r: number): boolean =>
		Math.min(p, r) < q && q < Math.max(p, r);
	if (a === e && !(c === a && between(b, d, f))) return 1;
	if (b === f && !(d === b && between(a, c, e))) return 1;
	if (
		Math.abs(c - e) === Math.abs(d - f) &&
		!(
			Math.abs(a - c) === Math.abs(b - d) &&
			(a - c) * (f - d) === (b - d) * (e - c) &&
			between(c, a, e)
		)
	)
		return 1;
	return 2;
};
