/**
 * 850. Rectangle Area II
 *
 * Returns the total area covered by the axis-aligned rectangles
 * `[x1, y1, x2, y2]`, counting overlaps once, modulo 10^9 + 7.
 *
 * Sweeps across the distinct x-coordinates. In each vertical strip, the
 * rectangles spanning it cover some y-intervals, which are merged and
 * measured. Areas can pass 2^53, so they're added up with `BigInt`.
 *
 * @see https://leetcode.com/problems/rectangle-area-ii/
 * @difficulty Hard
 * @timeComplexity O(n^2 log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rectangleAreaII([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]); // 6
 */
export const rectangleAreaII = (
	rectangles: readonly (readonly number[])[],
): number => {
	const xs = [
		...new Set(rectangles.flatMap(([x1 = 0, , x2 = 0]) => [x1, x2])),
	].sort((a, b) => a - b);
	let area = 0n;

	for (let i = 0; i + 1 < xs.length; i++) {
		const [left = 0, right = 0] = [xs[i], xs[i + 1]];
		const intervals = rectangles
			.filter(([x1 = 0, , x2 = 0]) => x1 <= left && right <= x2)
			.map(([, y1 = 0, , y2 = 0]) => [y1, y2] as const)
			.sort((a, b) => a[0] - b[0]);

		let covered = 0;
		let reach = Number.NEGATIVE_INFINITY;
		for (const [y1, y2] of intervals) {
			if (y2 <= reach) continue;
			covered += y2 - Math.max(y1, reach);
			reach = y2;
		}
		area += BigInt(covered) * BigInt(right - left);
	}

	return Number(area % 1_000_000_007n);
};
