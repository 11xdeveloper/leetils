/**
 * 469. Convex Polygon
 *
 * `points` are the vertices of a simple polygon, in order. Returns whether
 * the polygon is convex.
 *
 * A simple polygon is convex exactly when it turns the same way at every
 * vertex. The cross product of consecutive edges gives the direction of
 * each turn; straight "turns" (a zero cross product) don't count either
 * way.
 *
 * @see https://leetcode.com/problems/convex-polygon/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * convexPolygon([[0, 0], [0, 10], [10, 10], [10, 0], [5, 5]]); // false
 */
export const convexPolygon = (
	points: readonly (readonly number[])[],
): boolean => {
	const n = points.length;
	let direction = 0;

	for (let i = 0; i < n; i++) {
		const [ax = 0, ay = 0] = points[i] ?? [];
		const [bx = 0, by = 0] = points[(i + 1) % n] ?? [];
		const [cx = 0, cy = 0] = points[(i + 2) % n] ?? [];
		const cross = Math.sign((bx - ax) * (cy - by) - (by - ay) * (cx - bx));
		if (cross === 0) continue;
		if (direction !== 0 && cross !== direction) return false;
		direction = cross;
	}

	return true;
};
