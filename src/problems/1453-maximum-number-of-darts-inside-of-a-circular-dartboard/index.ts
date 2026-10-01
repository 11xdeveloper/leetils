/**
 * 1453. Maximum Number of Darts Inside of a Circular Dartboard
 *
 * Returns the most darts (points) a circle of radius `r` can cover,
 * boundary included.
 *
 * Some best circle has two darts on its edge (or covers just one). So try
 * every pair within `2r` of each other, and both circles of radius `r`
 * through them, counting the darts inside with a small tolerance for
 * rounding.
 *
 * @see https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfDartsInsideOfACircularDartboard([[-3, 0], [3, 0], [2, 6], [5, 4], [0, 9], [7, 8]], 5); // 5
 */
export const maximumNumberOfDartsInsideOfACircularDartboard = (
	darts: readonly (readonly number[])[],
	r: number,
): number => {
	const EPSILON = 1e-7;
	const inside = (cx: number, cy: number) =>
		darts.filter(([x = 0, y = 0]) => Math.hypot(x - cx, y - cy) <= r + EPSILON)
			.length;
	let best = Math.min(1, darts.length);
	for (let i = 0; i < darts.length; i++) {
		const [x1 = 0, y1 = 0] = darts[i] ?? [];
		for (let j = i + 1; j < darts.length; j++) {
			const [x2 = 0, y2 = 0] = darts[j] ?? [];
			const d = Math.hypot(x2 - x1, y2 - y1);
			if (d > 2 * r) continue;
			// The centres lie on the perpendicular bisector, h away from the midpoint.
			const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
			const h = Math.sqrt(Math.max(0, r * r - (d / 2) ** 2));
			const [ux, uy] = [(y1 - y2) / d, (x2 - x1) / d];
			best = Math.max(
				best,
				inside(mx + h * ux, my + h * uy),
				inside(mx - h * ux, my - h * uy),
			);
		}
	}
	return best;
};
