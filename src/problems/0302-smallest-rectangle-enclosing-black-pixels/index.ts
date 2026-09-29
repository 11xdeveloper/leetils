/**
 * 302. Smallest Rectangle Enclosing Black Pixels
 *
 * In a binary image where the black (`"1"`) pixels form one connected
 * region, and `(x, y)` is one of them, returns the area of the smallest
 * axis-aligned rectangle enclosing every black pixel, in less than O(mn)
 * time.
 *
 * Because the region is connected, the rows containing black pixels form
 * one unbroken band around row `x`, and the columns one band around column
 * `y`. Four binary searches find the bands' edges, each checking whether a
 * whole row or column has a black pixel.
 *
 * @see https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/
 * @difficulty Hard
 * @timeComplexity O(m log n + n log m)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestRectangleEnclosingBlackPixels([["0", "0", "1", "0"], ["0", "1", "1", "0"], ["0", "1", "0", "0"]], 0, 2); // 6
 */
export const smallestRectangleEnclosingBlackPixels = (
	image: readonly (readonly string[])[],
	x: number,
	y: number,
): number => {
	const rows = image.length;
	const columns = image[0]?.length ?? 0;
	const rowHasBlack = (r: number): boolean => image[r]?.includes("1") ?? false;
	const columnHasBlack = (c: number): boolean =>
		image.some((row) => row[c] === "1");

	/** The first index in [low, high) where hasBlack(i) equals `black`. */
	const firstWhere = (
		low: number,
		high: number,
		hasBlack: (i: number) => boolean,
		black: boolean,
	): number => {
		let lo = low;
		let hi = high;
		while (lo < hi) {
			const mid = Math.floor((lo + hi) / 2);
			if (hasBlack(mid) === black) hi = mid;
			else lo = mid + 1;
		}
		return lo;
	};

	const top = firstWhere(0, x, rowHasBlack, true);
	const bottom = firstWhere(x + 1, rows, rowHasBlack, false);
	const left = firstWhere(0, y, columnHasBlack, true);
	const right = firstWhere(y + 1, columns, columnHasBlack, false);

	return (bottom - top) * (right - left);
};
