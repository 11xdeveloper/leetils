/**
 * 2250. Count Number of Rectangles Containing Each Point
 *
 * Rectangles `[l, h]` span `(0, 0)` to `(l, h)`. Returns, for each point,
 * how many rectangles contain it (edges included). Heights are at most
 * 100.
 *
 * Group the lengths by height, sorted. For a point, count the lengths at
 * least its `x` in every height at least its `y`, by binary search.
 *
 * @see https://leetcode.com/problems/count-number-of-rectangles-containing-each-point/
 * @difficulty Medium
 * @timeComplexity O(r log r + p · 100 · log r)
 * @spaceComplexity O(r)
 *
 * @example
 * countNumberOfRectanglesContainingEachPoint([[1, 2], [2, 3], [2, 5]], [[2, 1], [1, 4]]); // [2, 1]
 */
export const countNumberOfRectanglesContainingEachPoint = (
	rectangles: readonly (readonly number[])[],
	points: readonly (readonly number[])[],
): number[] => {
	const byHeight: number[][] = Array.from({ length: 101 }, () => []);
	for (const [length = 0, height = 0] of rectangles)
		byHeight[height]?.push(length);
	for (const lengths of byHeight) lengths.sort((a, b) => a - b);
	return points.map(([x = 0, y = 0]) => {
		let count = 0;
		for (let height = y; height <= 100; height++) {
			const lengths = byHeight[height] ?? [];
			let [lo, hi] = [0, lengths.length];
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if ((lengths[mid] ?? 0) < x) lo = mid + 1;
				else hi = mid;
			}
			count += lengths.length - lo;
		}
		return count;
	});
};
