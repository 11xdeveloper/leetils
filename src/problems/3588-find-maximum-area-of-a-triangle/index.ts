/**
 * 3588. Find Maximum Area of a Triangle
 *
 * Returns twice the largest area of a triangle with corners in `coords`
 * and at least one side parallel to an axis, or -1 if no such triangle has
 * positive area.
 *
 * For a side along a horizontal line, use the widest pair of points on it
 * and the point furthest from that line; likewise for vertical lines.
 *
 * @see https://leetcode.com/problems/find-maximum-area-of-a-triangle/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMaximumAreaOfATriangle([[1, 1], [1, 2], [3, 2], [3, 3]]); // 2
 */
export const findMaximumAreaOfATriangle = (
	coords: readonly (readonly number[])[],
): number => {
	const best = (along: 0 | 1): number => {
		const across = 1 - along;
		const spans = new Map<number, [low: number, high: number]>();
		let [low, high] = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
		for (const point of coords) {
			const line = point[across] ?? 0;
			const position = point[along] ?? 0;
			const span = spans.get(line);
			spans.set(
				line,
				span
					? [Math.min(span[0], position), Math.max(span[1], position)]
					: [position, position],
			);
			low = Math.min(low, line);
			high = Math.max(high, line);
		}
		let result = 0;
		for (const [line, [from, to]] of spans)
			result = Math.max(
				result,
				(to - from) * Math.max(line - low, high - line),
			);
		return result;
	};
	const area = Math.max(best(0), best(1));
	return area > 0 ? area : -1;
};
