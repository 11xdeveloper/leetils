/**
 * 587. Erect the Fence
 *
 * Returns the trees (distinct points) that lie on the shortest fence
 * enclosing them all: the convex hull, including trees in the middle of
 * its edges. Any order is accepted.
 *
 * Andrew's monotone chain: sort the points, then build the lower and upper
 * hulls, popping a point only when it makes a clockwise turn, so points on
 * a straight edge stay. When every point is on one line, both hulls contain
 * all of them, so the result is deduplicated.
 *
 * @see https://leetcode.com/problems/erect-the-fence/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * erectTheFence([[1, 1], [2, 2], [2, 0], [2, 4], [3, 3], [4, 2]]); // [[1, 1], [2, 0], [4, 2], [3, 3], [2, 4]]
 */
export const erectTheFence = (
	trees: readonly (readonly number[])[],
): number[][] => {
	const points = trees
		.map(([x = 0, y = 0]) => [x, y] as const)
		.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	if (points.length <= 3) return points.map((point) => [...point]);

	const cross = (
		o: readonly number[],
		a: readonly number[],
		b: readonly number[],
	): number =>
		((a[0] ?? 0) - (o[0] ?? 0)) * ((b[1] ?? 0) - (o[1] ?? 0)) -
		((a[1] ?? 0) - (o[1] ?? 0)) * ((b[0] ?? 0) - (o[0] ?? 0));

	const chain = (
		ordered: (readonly [number, number])[],
	): (readonly [number, number])[] => {
		const hull: (readonly [number, number])[] = [];
		for (const point of ordered) {
			while (
				hull.length >= 2 &&
				cross(hull.at(-2) ?? point, hull.at(-1) ?? point, point) < 0
			)
				hull.pop();
			hull.push(point);
		}
		return hull;
	};

	const unique = new Map<string, number[]>();
	for (const point of [...chain(points), ...chain(points.toReversed())])
		unique.set(point.join(), [...point]);
	return [...unique.values()];
};
