/**
 * 3453. Separate Squares I
 *
 * Squares `[x, y, l]` sit with bottom-left corner (x, y) and side l. Returns
 * the lowest horizontal line with as much square area above it as below,
 * counting overlaps once per square.
 *
 * The area below a line grows continuously with its height, so binary
 * search the height until it's precise enough.
 *
 * @see https://leetcode.com/problems/separate-squares-i/
 * @difficulty Medium
 * @timeComplexity O(n log(range / ε))
 * @spaceComplexity O(1)
 *
 * @example
 * separateSquaresI([[0, 0, 1], [2, 2, 1]]); // 1
 */
export const separateSquaresI = (
	squares: readonly (readonly number[])[],
): number => {
	let total = 0;
	let lo = Number.POSITIVE_INFINITY;
	let hi = Number.NEGATIVE_INFINITY;
	for (const [, y = 0, l = 0] of squares) {
		total += l * l;
		lo = Math.min(lo, y);
		hi = Math.max(hi, y + l);
	}
	const below = (line: number): number => {
		let area = 0;
		for (const [, y = 0, l = 0] of squares)
			area += l * Math.min(l, Math.max(0, line - y));
		return area;
	};
	for (let step = 0; step < 100; step++) {
		const mid = (lo + hi) / 2;
		if (below(mid) * 2 >= total) hi = mid;
		else lo = mid;
	}
	return hi;
};
