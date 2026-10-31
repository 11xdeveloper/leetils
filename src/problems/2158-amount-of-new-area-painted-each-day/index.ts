/**
 * 2158. Amount of New Area Painted Each Day
 *
 * On day `i` the painter paints `[start, end)` of a number line. Returns
 * how much previously unpainted area is painted each day.
 *
 * Link each painted unit to the next one, compressing paths, so finding
 * the next unpainted unit skips painted stretches.
 *
 * @see https://leetcode.com/problems/amount-of-new-area-painted-each-day/
 * @difficulty Hard
 * @timeComplexity O((n + L) · α(L)) over coordinates up to L
 * @spaceComplexity O(L)
 *
 * @example
 * amountOfNewAreaPaintedEachDay([[1, 4], [4, 7], [5, 8]]); // [3, 3, 1]
 */
export const amountOfNewAreaPaintedEachDay = (
	paint: readonly (readonly number[])[],
): number[] => {
	const limit = Math.max(0, ...paint.map(([, end = 0]) => end)) + 1;
	const next = Int32Array.from({ length: limit }, (_, i) => i);
	const unpainted = (x: number): number => {
		let root = x;
		while (next[root] !== root) root = next[root] ?? root;
		while (next[x] !== root) {
			const following = next[x] ?? root;
			next[x] = root;
			x = following;
		}
		return root;
	};
	return paint.map(([start = 0, end = 0]) => {
		let painted = 0;
		for (let x = unpainted(start); x < end; x = unpainted(x + 1)) {
			next[x] = x + 1;
			painted++;
		}
		return painted;
	});
};
