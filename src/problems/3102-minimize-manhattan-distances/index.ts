/**
 * 3102. Minimize Manhattan Distances
 *
 * Remove exactly one point so the largest Manhattan distance between two
 * remaining points is as small as possible. Returns that distance.
 *
 * In rotated coordinates u = x + y and v = x - y, the largest Manhattan
 * distance is the larger of the u range and the v range. Only removing a
 * point at one of those four extremes can shrink it, so try each and
 * recompute the ranges without it.
 *
 * @see https://leetcode.com/problems/minimize-manhattan-distances/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeManhattanDistances([[3, 10], [5, 15], [10, 2], [4, 4]]); // 12
 */
export const minimizeManhattanDistances = (
	points: readonly (readonly number[])[],
): number => {
	const u = (i: number): number =>
		(points[i]?.[0] ?? 0) + (points[i]?.[1] ?? 0);
	const v = (i: number): number =>
		(points[i]?.[0] ?? 0) - (points[i]?.[1] ?? 0);
	const widest = (skip: number): [number, number[]] => {
		let [uMin, uMax, vMin, vMax] = [-1, -1, -1, -1];
		for (let i = 0; i < points.length; i++) {
			if (i === skip) continue;
			if (uMin === -1 || u(i) < u(uMin)) uMin = i;
			if (uMax === -1 || u(i) > u(uMax)) uMax = i;
			if (vMin === -1 || v(i) < v(vMin)) vMin = i;
			if (vMax === -1 || v(i) > v(vMax)) vMax = i;
		}
		return [
			Math.max(u(uMax) - u(uMin), v(vMax) - v(vMin)),
			[uMin, uMax, vMin, vMax],
		];
	};
	const [, extremes] = widest(-1);
	return Math.min(...extremes.map((skip) => widest(skip)[0]));
};
