/**
 * 1564. Put Boxes Into the Warehouse I
 *
 * Boxes are pushed into the warehouse from the left, each stopping when it
 * hits a room too low. Returns the most boxes that fit.
 *
 * A room effectively has the height of the lowest room before it. Fill the
 * rooms from the far end with the smallest boxes that fit, which leaves
 * the taller near rooms for taller boxes.
 *
 * @see https://leetcode.com/problems/put-boxes-into-the-warehouse-i/
 * @difficulty Medium
 * @timeComplexity O(b log b + n)
 * @spaceComplexity O(b + n)
 *
 * @example
 * putBoxesIntoTheWarehouseI([4, 3, 4, 1], [5, 3, 3, 4, 1]); // 3
 */
export const putBoxesIntoTheWarehouseI = (
	boxes: readonly number[],
	warehouse: readonly number[],
): number => {
	const reach: number[] = [];
	for (const height of warehouse)
		reach.push(Math.min(reach.at(-1) ?? Infinity, height));
	const sorted = boxes.toSorted((a, b) => a - b);
	let placed = 0;
	for (
		let room = reach.length - 1;
		room >= 0 && placed < sorted.length;
		room--
	) {
		if ((sorted[placed] ?? Infinity) <= (reach[room] ?? 0)) placed++;
	}
	return placed;
};
