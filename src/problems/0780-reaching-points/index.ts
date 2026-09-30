/**
 * 780. Reaching Points
 *
 * From a point `(x, y)` you can move to `(x, x + y)` or `(x + y, y)`.
 * Returns whether `(sx, sy)` can reach `(tx, ty)`.
 *
 * Working backwards, each point has only one possible previous point: the
 * larger coordinate came from subtracting the smaller. Repeated subtraction
 * is a remainder, so it steps back in large jumps until one coordinate
 * reaches its start, then checks the other can be reached by subtracting.
 *
 * @see https://leetcode.com/problems/reaching-points/
 * @difficulty Hard
 * @timeComplexity O(log max(tx, ty))
 * @spaceComplexity O(1)
 *
 * @example
 * reachingPoints(1, 1, 3, 5); // true
 */
export const reachingPoints = (
	sx: number,
	sy: number,
	tx: number,
	ty: number,
): boolean => {
	while (tx > sx && ty > sy && tx !== ty) {
		if (tx > ty) tx %= ty;
		else ty %= tx;
	}
	if (tx === sx) return ty >= sy && (ty - sy) % sx === 0;
	if (ty === sy) return tx >= sx && (tx - sx) % sy === 0;
	return false;
};
