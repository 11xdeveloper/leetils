/**
 * 1580. Put Boxes Into the Warehouse II
 *
 * Like Put Boxes Into the Warehouse I, but boxes can be pushed in from
 * either end. Returns the most boxes that fit.
 *
 * A room can hold a box as tall as the better of its two approaches: the
 * lowest room on its left or the lowest on its right, itself included. Then
 * match boxes to rooms greedily, smallest box to the lowest room that fits
 * it.
 *
 * @see https://leetcode.com/problems/put-boxes-into-the-warehouse-ii/
 * @difficulty Medium
 * @timeComplexity O(b log b + n log n)
 * @spaceComplexity O(b + n)
 *
 * @example
 * putBoxesIntoTheWarehouseII([1, 2, 2, 3, 4], [3, 4, 1, 2]); // 4
 */
export const putBoxesIntoTheWarehouseII = (
	boxes: readonly number[],
	warehouse: readonly number[],
): number => {
	const n = warehouse.length;
	const fromLeft = new Array<number>(n);
	const fromRight = new Array<number>(n);
	for (let i = 0; i < n; i++)
		fromLeft[i] = Math.min(fromLeft[i - 1] ?? Infinity, warehouse[i] ?? 0);
	for (let i = n - 1; i >= 0; i--)
		fromRight[i] = Math.min(fromRight[i + 1] ?? Infinity, warehouse[i] ?? 0);
	const rooms = warehouse
		.map((_, i) => Math.max(fromLeft[i] ?? 0, fromRight[i] ?? 0))
		.sort((a, b) => a - b);
	const sorted = boxes.toSorted((a, b) => a - b);
	let placed = 0;
	for (const room of rooms) {
		if (placed < sorted.length && (sorted[placed] ?? Infinity) <= room)
			placed++;
	}
	return placed;
};
