/**
 * 3625. Count Number of Trapezoids II
 *
 * Counts the convex quadrilaterals with corners in `points` that have at
 * least one pair of parallel sides.
 *
 * Two segments with the same slope on different lines make a trapezoid,
 * so count such pairs by slope, minus those on a shared line. That counts
 * parallelograms twice, once per pair of sides, so subtract them once:
 * they're the pairs of non-collinear segments sharing a midpoint.
 *
 * @see https://leetcode.com/problems/count-number-of-trapezoids-ii/
 * @difficulty Hard
 * @timeComplexity O(n² log C)
 * @spaceComplexity O(n²)
 *
 * @example
 * countNumberOfTrapezoidsII([[0, 0], [1, 0], [0, 1], [2, 1]]); // 1
 */
export const countNumberOfTrapezoidsII = (
	points: readonly (readonly number[])[],
): number => {
	const gcd = (a: number, b: number): number =>
		b === 0 ? Math.abs(a) : gcd(b, a % b);
	const bump = (map: Map<string, number>, key: string): number => {
		const before = map.get(key) ?? 0;
		map.set(key, before + 1);
		return before;
	};
	const bySlope = new Map<string, number>();
	const byLine = new Map<string, number>();
	const byMidpoint = new Map<string, number>();
	const byMidpointSlope = new Map<string, number>();
	let count = 0;
	for (let i = 0; i < points.length; i++)
		for (let j = i + 1; j < points.length; j++) {
			const [x1 = 0, y1 = 0] = points[i] ?? [];
			const [x2 = 0, y2 = 0] = points[j] ?? [];
			let [dx, dy] = [x2 - x1, y2 - y1];
			const g = gcd(dx, dy);
			[dx, dy] = [dx / g, dy / g];
			if (dx < 0 || (dx === 0 && dy < 0)) [dx, dy] = [-dx, -dy];
			const slope = `${dx},${dy}`;
			const midpoint = `${x1 + x2},${y1 + y2}`;
			count +=
				bump(bySlope, slope) - bump(byLine, `${slope},${dy * x1 - dx * y1}`);
			count -=
				bump(byMidpoint, midpoint) -
				bump(byMidpointSlope, `${midpoint},${slope}`);
		}
	return count;
};
