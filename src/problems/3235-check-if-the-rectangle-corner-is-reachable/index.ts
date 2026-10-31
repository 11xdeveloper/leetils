/**
 * 3235. Check if the Rectangle Corner Is Reachable
 *
 * Whether there's a path from (0, 0) to (xCorner, yCorner) inside the
 * rectangle that never touches or enters a circle, and touches the
 * rectangle's boundary only at those two corners.
 *
 * The path is blocked exactly when a chain of touching circles links the
 * left or top edge to the right or bottom edge, or a circle covers a
 * corner. Join circles with union-find, counting two circles as linked
 * only if they overlap inside the rectangle (their weighted midpoint is in
 * it). Coordinates reach 10⁹, so compare squares with BigInt.
 *
 * @see https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable/
 * @difficulty Hard
 * @timeComplexity O(n² α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfTheRectangleCornerIsReachable(3, 4, [[2, 1, 1]]); // true
 */
export const checkIfTheRectangleCornerIsReachable = (
	xCorner: number,
	yCorner: number,
	circles: readonly (readonly number[])[],
): boolean => {
	const X = BigInt(xCorner);
	const Y = BigInt(yCorner);
	const n = circles.length;
	const parent = Array.from({ length: n + 2 }, (_, i) => i);
	const find = (a: number): number => {
		let root = a;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = a; node !== root; ) {
			const up = parent[node] ?? root;
			parent[node] = root;
			node = up;
		}
		return root;
	};
	const union = (a: number, b: number): void => {
		parent[find(a)] = find(b);
	};
	const START = n;
	const END = n + 1;
	const big = circles.map((circle) => circle.map(BigInt));
	/** Squared distance from (x, y) to the segment from (x1, y1) to (x2, y2), axis-aligned. */
	const toSegment = (
		x: bigint,
		y: bigint,
		x1: bigint,
		y1: bigint,
		x2: bigint,
		y2: bigint,
	): bigint => {
		const cx = x < x1 ? x1 : x > x2 ? x2 : x;
		const cy = y < y1 ? y1 : y > y2 ? y2 : y;
		return (x - cx) ** 2n + (y - cy) ** 2n;
	};
	for (let i = 0; i < n; i++) {
		const [x = 0n, y = 0n, r = 0n] = big[i] ?? [];
		const r2 = r * r;
		if (x * x + y * y <= r2 || (x - X) ** 2n + (y - Y) ** 2n <= r2)
			return false;
		if (
			toSegment(x, y, 0n, 0n, 0n, Y) <= r2 ||
			toSegment(x, y, 0n, Y, X, Y) <= r2
		)
			union(i, START);
		if (
			toSegment(x, y, X, 0n, X, Y) <= r2 ||
			toSegment(x, y, 0n, 0n, X, 0n) <= r2
		)
			union(i, END);
		for (let j = 0; j < i; j++) {
			const [x2 = 0n, y2 = 0n, r3 = 0n] = big[j] ?? [];
			if ((x - x2) ** 2n + (y - y2) ** 2n > (r + r3) ** 2n) continue;
			if (x * r3 + x2 * r < X * (r + r3) && y * r3 + y2 * r < Y * (r + r3))
				union(i, j);
		}
	}
	return find(START) !== find(END);
};
