const gcd = (a: number, b: number): number =>
	b === 0 ? Math.abs(a) : gcd(b, a % b);

/**
 * 149. Max Points on a Line
 *
 * Returns the largest number of the given distinct points that lie on one
 * straight line.
 *
 * For each point, groups every later point by the direction to it. The
 * direction is stored as a reduced fraction with a fixed sign, so equal
 * slopes always get the same key and no floating-point rounding is
 * involved.
 *
 * @see https://leetcode.com/problems/max-points-on-a-line/
 * @difficulty Hard
 * @timeComplexity O(n^2 log m) where m is the largest coordinate
 * @spaceComplexity O(n)
 *
 * @example
 * maxPointsOnALine([[1, 1], [2, 2], [3, 3]]); // 3
 */
export const maxPointsOnALine = (
	points: readonly (readonly number[])[],
): number => {
	let best = Math.min(points.length, 1);

	for (const [i, [x1 = 0, y1 = 0]] of points.entries()) {
		const slopes = new Map<string, number>();
		for (const [x2 = 0, y2 = 0] of points.slice(i + 1)) {
			let dx = x2 - x1;
			let dy = y2 - y1;
			const divisor = gcd(dx, dy);
			dx /= divisor;
			dy /= divisor;
			if (dx < 0 || (dx === 0 && dy < 0)) {
				dx = -dx;
				dy = -dy;
			}
			const key = `${dx}/${dy}`;
			const count = (slopes.get(key) ?? 1) + 1;
			slopes.set(key, count);
			best = Math.max(best, count);
		}
	}

	return best;
};
