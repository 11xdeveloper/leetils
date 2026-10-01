/**
 * 1515. Best Position for a Service Centre
 *
 * Returns the smallest possible sum of Euclidean distances from one point
 * to all of `positions`.
 *
 * The sum is convex, so a pattern search finds its minimum: start at the
 * centroid, step in whichever of eight directions improves, and halve the
 * step when none does, until the step is tiny.
 *
 * @see https://leetcode.com/problems/best-position-for-a-service-centre/
 * @difficulty Hard
 * @timeComplexity O(n log(range / precision))
 * @spaceComplexity O(1)
 *
 * @example
 * bestPositionForAServiceCentre([[1, 1], [3, 3]]); // 2.8284271247461903
 */
export const bestPositionForAServiceCentre = (
	positions: readonly (readonly number[])[],
): number => {
	const total = (x: number, y: number) =>
		positions.reduce(
			(sum, [px = 0, py = 0]) => sum + Math.hypot(px - x, py - y),
			0,
		);
	let x = positions.reduce((sum, [px = 0]) => sum + px, 0) / positions.length;
	let y = positions.reduce((sum, [, py = 0]) => sum + py, 0) / positions.length;
	let best = total(x, y);
	for (let step = 100; step > 1e-8; ) {
		let moved = false;
		for (let direction = 0; direction < 8; direction++) {
			const angle = (direction * Math.PI) / 4;
			const [dx, dy] = [step * Math.cos(angle), step * Math.sin(angle)];
			const candidate = total(x + dx, y + dy);
			if (candidate < best) {
				[x, y, best, moved] = [x + dx, y + dy, candidate, true];
				break;
			}
		}
		if (!moved) step /= 2;
	}
	return best;
};
