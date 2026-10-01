/**
 * 1943. Describe the Painting
 *
 * Segments `[start, end, color]` (distinct colours) are painted on a line,
 * mixing where they overlap. Returns the painting as half-open pieces
 * `[left, right, sum of colours]`, leaving out unpainted parts.
 *
 * Sweep the event points in order with a running colour sum; every event
 * point starts a new piece, since the mix changes there even when the sum
 * doesn't.
 *
 * @see https://leetcode.com/problems/describe-the-painting/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * describeThePainting([[1, 7, 9], [6, 8, 15], [8, 10, 7]]); // [[1, 6, 9], [6, 7, 24], [7, 8, 15], [8, 10, 7]]
 */
export const describeThePainting = (
	segments: readonly (readonly number[])[],
): number[][] => {
	const change = new Map<number, number>();
	for (const [start = 0, end = 0, color = 0] of segments) {
		change.set(start, (change.get(start) ?? 0) + color);
		change.set(end, (change.get(end) ?? 0) - color);
	}
	const points = [...change.keys()].sort((a, b) => a - b);
	const pieces: number[][] = [];
	let sum = 0;
	for (const [i, point] of points.entries()) {
		sum += change.get(point) ?? 0;
		const next = points[i + 1];
		if (sum > 0 && next !== undefined) pieces.push([point, next, sum]);
	}
	return pieces;
};
