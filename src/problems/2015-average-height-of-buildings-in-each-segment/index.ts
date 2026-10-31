/**
 * 2015. Average Height of Buildings in Each Segment
 *
 * Buildings `[start, end, height]` cover the half-open range
 * `[start, end)` of a street. Returns the fewest segments
 * `[left, right, average]` describing the street, where `average` is the
 * floor of the mean height of the buildings there; gaps are left out.
 *
 * Sweep over the building ends, tracking the total height and count. Each
 * stretch between events extends the last segment when it touches it with
 * the same average.
 *
 * @see https://leetcode.com/problems/average-height-of-buildings-in-each-segment/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * averageHeightOfBuildingsInEachSegment([[1, 4, 2], [3, 9, 4]]); // [[1, 3, 2], [3, 4, 3], [4, 9, 4]]
 */
export const averageHeightOfBuildingsInEachSegment = (
	buildings: readonly (readonly number[])[],
): number[][] => {
	const changes = new Map<number, [height: number, count: number]>();
	const change = (point: number, height: number, count: number): void => {
		const [h, c] = changes.get(point) ?? [0, 0];
		changes.set(point, [h + height, c + count]);
	};
	for (const [start = 0, end = 0, height = 0] of buildings) {
		change(start, height, 1);
		change(end, -height, -1);
	}

	const segments: number[][] = [];
	let [height, count, previous] = [0, 0, 0];
	for (const point of [...changes.keys()].sort((a, b) => a - b)) {
		if (count > 0) {
			const average = Math.floor(height / count);
			const last = segments.at(-1);
			if (last && last[1] === previous && last[2] === average) last[1] = point;
			else segments.push([previous, point, average]);
		}
		const [h, c] = changes.get(point) ?? [0, 0];
		[height, count, previous] = [height + h, count + c, point];
	}
	return segments;
};
