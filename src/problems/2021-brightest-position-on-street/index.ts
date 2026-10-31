/**
 * 2021. Brightest Position on Street
 *
 * A street lamp `[position, range]` lights `[position - range,
 * position + range]`. Returns the smallest position lit by the most lamps.
 *
 * Sweep over the points where the brightness changes: +1 where a lamp's
 * light starts, -1 just after it ends.
 *
 * @see https://leetcode.com/problems/brightest-position-on-street/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * brightestPositionOnStreet([[-3, 2], [1, 2], [3, 3]]); // -1
 */
export const brightestPositionOnStreet = (
	lights: readonly (readonly number[])[],
): number => {
	const changes = new Map<number, number>();
	for (const [position = 0, range = 0] of lights) {
		const [start, after] = [position - range, position + range + 1];
		changes.set(start, (changes.get(start) ?? 0) + 1);
		changes.set(after, (changes.get(after) ?? 0) - 1);
	}
	let [brightness, brightest, best] = [0, 0, 0];
	for (const point of [...changes.keys()].sort((a, b) => a - b)) {
		brightness += changes.get(point) ?? 0;
		if (brightness > brightest) [brightest, best] = [brightness, point];
	}
	return best;
};
