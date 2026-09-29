/**
 * 335. Self Crossing
 *
 * Starting at the origin, a path moves `distance[0]` north, then
 * `distance[1]` west, `distance[2]` south, `distance[3]` east, and so on,
 * turning counter-clockwise each time. Returns whether it ever crosses or
 * touches itself.
 *
 * A new segment can only meet one of the three, four or five segments
 * before it, so three cases cover every crossing: it crosses the segment
 * three back, it meets the segment four back head-on, or it cuts across the
 * segment five back after a spiral starts shrinking.
 *
 * @see https://leetcode.com/problems/self-crossing/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * selfCrossing([2, 1, 1, 2]); // true
 */
export const selfCrossing = (distance: readonly number[]): boolean => {
	const d = (i: number): number => distance[i] ?? 0;

	for (let i = 3; i < distance.length; i++) {
		// Crosses the segment three back.
		if (d(i) >= d(i - 2) && d(i - 1) <= d(i - 3)) return true;
		// Meets the segment four back end to end.
		if (i >= 4 && d(i - 1) === d(i - 3) && d(i) + d(i - 4) >= d(i - 2))
			return true;
		// Cuts across the segment five back.
		if (
			i >= 5 &&
			d(i - 2) >= d(i - 4) &&
			d(i) + d(i - 4) >= d(i - 2) &&
			d(i - 1) <= d(i - 3) &&
			d(i - 1) + d(i - 5) >= d(i - 3)
		) {
			return true;
		}
	}

	return false;
};
