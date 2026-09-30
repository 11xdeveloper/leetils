/**
 * 963. Minimum Area Rectangle II
 *
 * Returns the smallest area of a rectangle, in any orientation, with all
 * four corners among the distinct `points`, or 0 if there's none.
 *
 * A rectangle's diagonals share their midpoint and length. It groups every
 * pair of points by (midpoint, length); any two pairs in a group are the
 * diagonals of a rectangle, whose area follows from two adjacent sides.
 *
 * @see https://leetcode.com/problems/minimum-area-rectangle-ii/
 * @difficulty Medium
 * @timeComplexity O(n^4) in the worst case, O(n^2) typically
 * @spaceComplexity O(n^2)
 *
 * @example
 * minimumAreaRectangleII([[1, 2], [2, 1], [1, 0], [0, 1]]); // 2
 */
export const minimumAreaRectangleII = (
	points: readonly (readonly number[])[],
): number => {
	const groups = new Map<string, [number, number][]>();
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const [x1 = 0, y1 = 0] = points[i] ?? [];
			const [x2 = 0, y2 = 0] = points[j] ?? [];
			// Doubled midpoint keeps the key in integers.
			const key = `${x1 + x2},${y1 + y2},${(x1 - x2) ** 2 + (y1 - y2) ** 2}`;
			const group = groups.get(key);
			if (group) group.push([i, j]);
			else groups.set(key, [[i, j]]);
		}
	}

	let smallest = Number.POSITIVE_INFINITY;
	for (const pairs of groups.values()) {
		for (let a = 0; a < pairs.length; a++) {
			for (let b = a + 1; b < pairs.length; b++) {
				const [p = [], q = []] = [
					points[pairs[a]?.[0] ?? 0],
					points[pairs[a]?.[1] ?? 0],
				];
				const [r = []] = [points[pairs[b]?.[0] ?? 0]];
				const side = (u: readonly number[], v: readonly number[]) =>
					Math.hypot((u[0] ?? 0) - (v[0] ?? 0), (u[1] ?? 0) - (v[1] ?? 0));
				smallest = Math.min(smallest, side(p, r) * side(q, r));
			}
		}
	}
	return smallest === Number.POSITIVE_INFINITY ? 0 : smallest;
};
