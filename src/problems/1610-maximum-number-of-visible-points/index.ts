/**
 * 1610. Maximum Number of Visible Points
 *
 * Standing at `location` with a field of view `angle` degrees wide, returns
 * the most `points` visible at once after turning to the best direction.
 * Points at your own location are always visible.
 *
 * Sorts the other points by angle and appends them again shifted by 360°
 * to handle wrapping; a sliding window then finds the most angles within
 * `angle` of each other.
 *
 * @see https://leetcode.com/problems/maximum-number-of-visible-points/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfVisiblePoints([[2, 1], [2, 2], [3, 3]], 90, [1, 1]); // 3
 */
export const maximumNumberOfVisiblePoints = (
	points: readonly (readonly number[])[],
	angle: number,
	location: readonly number[],
): number => {
	const [x0 = 0, y0 = 0] = location;
	let here = 0;
	const angles: number[] = [];
	for (const [x = 0, y = 0] of points) {
		if (x === x0 && y === y0) here++;
		else angles.push((Math.atan2(y - y0, x - x0) * 180) / Math.PI);
	}
	angles.sort((a, b) => a - b);
	const all = [...angles, ...angles.map((a) => a + 360)];
	let [start, most] = [0, 0];
	for (let end = 0; end < all.length; end++) {
		while ((all[end] ?? 0) - (all[start] ?? 0) > angle + 1e-9) start++;
		most = Math.max(most, Math.min(end - start + 1, angles.length));
	}
	return most + here;
};
