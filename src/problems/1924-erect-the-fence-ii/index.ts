type Circle = readonly [x: number, y: number, r: number];

const EPSILON = 1e-7;

const contains = ([x, y, r]: Circle, [px = 0, py = 0]: readonly number[]) =>
	Math.hypot(px - x, py - y) <= r + EPSILON;

const fromTwo = (
	[ax = 0, ay = 0]: readonly number[],
	[bx = 0, by = 0]: readonly number[],
): Circle => [(ax + bx) / 2, (ay + by) / 2, Math.hypot(ax - bx, ay - by) / 2];

/** The circumcircle of three points (the widest pair's circle if they're collinear). */
const fromThree = (
	a: readonly number[],
	b: readonly number[],
	c: readonly number[],
): Circle => {
	const [ax = 0, ay = 0] = a;
	const [bx = 0, by = 0] = b;
	const [cx = 0, cy = 0] = c;
	const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
	if (Math.abs(d) < EPSILON) {
		const options = [fromTwo(a, b), fromTwo(a, c), fromTwo(b, c)];
		return options.reduce((best, circle) =>
			circle[2] > best[2] ? circle : best,
		);
	}
	const [a2, b2, c2] = [
		ax * ax + ay * ay,
		bx * bx + by * by,
		cx * cx + cy * cy,
	];
	const x = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
	const y = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;
	return [x, y, Math.hypot(ax - x, ay - y)];
};

/**
 * 1924. Erect the Fence II
 *
 * Returns the smallest circle `[x, y, r]` enclosing every tree.
 *
 * Welzl's algorithm in its iterative form: after shuffling, whenever a
 * point falls outside the current circle it must lie on the boundary, so
 * rebuild the circle through it (and, nested, through a second and third
 * such point). Expected linear time.
 *
 * @see https://leetcode.com/problems/erect-the-fence-ii/
 * @difficulty Hard
 * @timeComplexity O(n) expected
 * @spaceComplexity O(n)
 *
 * @example
 * erectTheFenceII([[1, 2], [2, 2], [4, 2]]); // [2.5, 2, 1.5]
 */
export const erectTheFenceII = (
	trees: readonly (readonly number[])[],
): number[] => {
	// A fixed pseudo-random shuffle keeps results reproducible.
	const points = [...trees];
	let seed = 1924;
	for (let i = points.length - 1; i > 0; i--) {
		seed = (seed * 1103515245 + 12345) % 2147483648;
		const j = seed % (i + 1);
		[points[i], points[j]] = [points[j] ?? [], points[i] ?? []];
	}
	const [first = 0, second = 0] = points[0] ?? [];
	let circle: Circle = [first, second, 0];
	for (let i = 1; i < points.length; i++) {
		const p = points[i] ?? [];
		if (contains(circle, p)) continue;
		circle = [p[0] ?? 0, p[1] ?? 0, 0];
		for (let j = 0; j < i; j++) {
			const q = points[j] ?? [];
			if (contains(circle, q)) continue;
			circle = fromTwo(p, q);
			for (let k = 0; k < j; k++) {
				const s = points[k] ?? [];
				if (!contains(circle, s)) circle = fromThree(p, q, s);
			}
		}
	}
	return [...circle];
};
