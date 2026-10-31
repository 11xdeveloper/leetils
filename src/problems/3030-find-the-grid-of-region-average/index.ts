/**
 * 3030. Find the Grid of Region Average
 *
 * A 3 × 3 block of `image` is a region if every pair of side-by-side pixels
 * in it differs by at most `threshold`. Each region's value is its pixels'
 * average, rounded down. Returns a grid where each pixel holds the rounded
 * down average of the values of the regions it belongs to, or its own
 * value if it belongs to none.
 *
 * Check every 3 × 3 block, adding each region's value and a count to all
 * nine of its pixels, then divide.
 *
 * @see https://leetcode.com/problems/find-the-grid-of-region-average/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * findTheGridOfRegionAverage([[5, 6, 7, 10], [8, 9, 10, 10], [11, 12, 13, 10]], 3);
 * // [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]]
 */
export const findTheGridOfRegionAverage = (
	image: readonly (readonly number[])[],
	threshold: number,
): number[][] => {
	const m = image.length;
	const n = image[0]?.length ?? 0;
	const at = (r: number, c: number): number => image[r]?.[c] ?? 0;
	const sums = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	const counts = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	for (let r = 0; r + 2 < m; r++)
		for (let c = 0; c + 2 < n; c++) {
			let region = true;
			let total = 0;
			for (let i = r; i < r + 3 && region; i++)
				for (let j = c; j < c + 3; j++) {
					total += at(i, j);
					if (
						(j + 1 < c + 3 && Math.abs(at(i, j) - at(i, j + 1)) > threshold) ||
						(i + 1 < r + 3 && Math.abs(at(i, j) - at(i + 1, j)) > threshold)
					) {
						region = false;
						break;
					}
				}
			if (!region) continue;
			const value = Math.floor(total / 9);
			for (let i = r; i < r + 3; i++)
				for (let j = c; j < c + 3; j++) {
					const sumRow = sums[i];
					const countRow = counts[i];
					if (sumRow) sumRow[j] = (sumRow[j] ?? 0) + value;
					if (countRow) countRow[j] = (countRow[j] ?? 0) + 1;
				}
		}
	return image.map((row, r) =>
		row.map((pixel, c) => {
			const count = counts[r]?.[c] ?? 0;
			return count === 0 ? pixel : Math.floor((sums[r]?.[c] ?? 0) / count);
		}),
	);
};
