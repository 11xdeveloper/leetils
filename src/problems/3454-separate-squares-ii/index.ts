/**
 * 3454. Separate Squares II
 *
 * Squares `[x, y, l]` sit with bottom-left corner (x, y) and side l. Returns
 * the lowest horizontal line with as much covered area above it as below,
 * counting overlapping area once.
 *
 * Sweep upwards through the squares' bottom and top edges, keeping the
 * covered width with a segment tree over the x coordinates. That splits
 * the union into horizontal strips of known width; find the strip where the
 * area below reaches half and interpolate inside it.
 *
 * @see https://leetcode.com/problems/separate-squares-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * separateSquaresII([[0, 0, 2], [1, 1, 1]]); // 1
 */
export const separateSquaresII = (
	squares: readonly (readonly number[])[],
): number => {
	const xs = [
		...new Set(squares.flatMap(([x = 0, , l = 0]) => [x, x + l])),
	].sort((a, b) => a - b);
	const index = new Map(xs.map((x, i) => [x, i]));
	const segments = xs.length - 1;
	const cover = new Int32Array(4 * segments);
	const covered = new Float64Array(4 * segments);
	const update = (
		node: number,
		lo: number,
		hi: number,
		from: number,
		to: number,
		delta: number,
	): void => {
		if (to <= lo || hi <= from) return;
		if (from <= lo && hi <= to) cover[node] = (cover[node] ?? 0) + delta;
		else {
			const mid = (lo + hi) >>> 1;
			update(2 * node, lo, mid, from, to, delta);
			update(2 * node + 1, mid, hi, from, to, delta);
		}
		covered[node] =
			(cover[node] ?? 0) > 0
				? (xs[hi] ?? 0) - (xs[lo] ?? 0)
				: hi - lo === 1
					? 0
					: (covered[2 * node] ?? 0) + (covered[2 * node + 1] ?? 0);
	};
	const events = squares
		.flatMap(([x = 0, y = 0, l = 0]) => [
			[y, 1, x, x + l] as const,
			[y + l, -1, x, x + l] as const,
		])
		.sort((a, b) => a[0] - b[0]);
	const strips: [bottom: number, top: number, width: number][] = [];
	let total = 0;
	for (let i = 0; i < events.length; i++) {
		const [y, delta, from, to] = events[i] ?? [0, 0, 0, 0];
		update(1, 0, segments, index.get(from) ?? 0, index.get(to) ?? 0, delta);
		const nextY = events[i + 1]?.[0];
		if (nextY === undefined || nextY === y) continue;
		const width = covered[1] ?? 0;
		strips.push([y, nextY, width]);
		total += width * (nextY - y);
	}
	let below = 0;
	for (const [bottom, top, width] of strips) {
		const area = width * (top - bottom);
		if (width > 0 && 2 * (below + area) >= total)
			return bottom + (total / 2 - below) / width;
		below += area;
	}
	return strips.at(-1)?.[1] ?? 0;
};
