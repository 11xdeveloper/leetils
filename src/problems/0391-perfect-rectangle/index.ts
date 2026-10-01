/**
 * 391. Perfect Rectangle
 *
 * Given axis-aligned rectangles `[x1, y1, x2, y2]`, returns whether together
 * they exactly cover one rectangle, with no gaps and no overlaps.
 *
 * Two conditions are needed and enough. The areas must add up to the area
 * of the bounding box. And every corner point must appear an even number of
 * times across the rectangles (where pieces meet), except the bounding
 * box's four corners, which appear exactly once; toggling each corner in a
 * set leaves exactly those four.
 *
 * @see https://leetcode.com/problems/perfect-rectangle/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * perfectRectangle([[1, 1, 3, 3], [3, 1, 4, 2], [3, 2, 4, 4], [1, 3, 2, 4], [2, 3, 3, 4]]); // true
 */
export const perfectRectangle = (
	rectangles: readonly (readonly number[])[],
): boolean => {
	let [left, bottom, right, top] = [
		Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY,
		Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY,
	];
	let area = 0;
	const corners = new Set<string>();
	const toggle = (x: number, y: number): void => {
		const key = `${x},${y}`;
		if (!corners.delete(key)) corners.add(key);
	};

	for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of rectangles) {
		left = Math.min(left, x1);
		bottom = Math.min(bottom, y1);
		right = Math.max(right, x2);
		top = Math.max(top, y2);
		area += (x2 - x1) * (y2 - y1);
		toggle(x1, y1);
		toggle(x1, y2);
		toggle(x2, y1);
		toggle(x2, y2);
	}

	return (
		area === (right - left) * (top - bottom) &&
		corners.size === 4 &&
		corners.has(`${left},${bottom}`) &&
		corners.has(`${left},${top}`) &&
		corners.has(`${right},${bottom}`) &&
		corners.has(`${right},${top}`)
	);
};
