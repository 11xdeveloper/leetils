/**
 * 3951. Minimum Energy to Maintain Brightness
 *
 * A lit bulb lights itself and its neighbours; every time unit inside some
 * interval needs at least `brightness` lit positions, at a cost of one
 * energy per bulb on. Returns the least total energy.
 *
 * Each bulb lights at most 3 positions, and bulbs every third position
 * achieve that (within n bulbs), so each covered time needs
 * ⌈brightness / 3⌉ bulbs. Multiply by the size of the intervals' union.
 *
 * @see https://leetcode.com/problems/minimum-energy-to-maintain-brightness/
 * @difficulty Medium
 * @timeComplexity O(m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * minimumEnergyToMaintainBrightness(5, 5, [[6, 12]]); // 14
 */
export const minimumEnergyToMaintainBrightness = (
	_n: number,
	brightness: number,
	intervals: readonly (readonly number[])[],
): number => {
	const sorted = [...intervals].sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	let covered = 0;
	let [start, end] = [0, -2];
	for (const [from = 0, to = 0] of sorted) {
		if (from > end + 1) {
			if (end >= start) covered += end - start + 1;
			[start, end] = [from, to];
		} else end = Math.max(end, to);
	}
	if (end >= start) covered += end - start + 1;
	return covered * Math.ceil(brightness / 3);
};
