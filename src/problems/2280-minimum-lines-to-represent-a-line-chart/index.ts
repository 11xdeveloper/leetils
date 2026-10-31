/**
 * 2280. Minimum Lines to Represent a Line Chart
 *
 * `stockPrices[i] = [day, price]`. Returns the fewest straight segments
 * drawing the chart through the points in day order.
 *
 * Sort by day and count slope changes, comparing slopes by cross
 * multiplication in BigInt, since the products can exceed 2^53.
 *
 * @see https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumLinesToRepresentALineChart([[3, 4], [1, 2], [7, 8], [2, 3]]); // 1
 */
export const minimumLinesToRepresentALineChart = (
	stockPrices: readonly (readonly number[])[],
): number => {
	const points = stockPrices
		.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0))
		.map(([day = 0, price = 0]) => [BigInt(day), BigInt(price)] as const);
	let lines = 0;
	for (let i = 1; i < points.length; i++) {
		const [x1, y1] = points[i - 1] ?? [0n, 0n];
		const [x2, y2] = points[i] ?? [0n, 0n];
		const before = points[i - 2];
		if (before) {
			const [x0, y0] = before;
			if ((y1 - y0) * (x2 - x1) === (y2 - y1) * (x1 - x0)) continue;
		}
		lines++;
	}
	return lines;
};
