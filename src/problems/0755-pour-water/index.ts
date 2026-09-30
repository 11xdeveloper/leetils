/**
 * 755. Pour Water
 *
 * Drops `volume` units of water one at a time at index `k` of the terrain
 * `heights`. Each unit moves left if it would eventually fall by doing so,
 * otherwise right if that makes it fall, otherwise stays at `k`, settling
 * at the lowest reachable spot nearest `k`. Returns the levels afterwards.
 *
 * For each unit, walks left while the level doesn't rise, then back
 * towards `k` across any flat stretch to the nearest lowest spot. If that's
 * lower than `k`, the unit goes there; otherwise it tries the right in the
 * same way, and failing that rests at `k`.
 *
 * @see https://leetcode.com/problems/pour-water/
 * @difficulty Medium
 * @timeComplexity O(volume · n)
 * @spaceComplexity O(n) for the copy
 *
 * @example
 * pourWater([2, 1, 1, 2, 1, 2, 2], 4, 3); // [2, 2, 2, 3, 2, 2, 2]
 */
export const pourWater = (
	heights: readonly number[],
	volume: number,
	k: number,
): number[] => {
	const levels = [...heights];
	const at = (i: number): number => levels[i] ?? Number.POSITIVE_INFINITY;

	for (let drop = 0; drop < volume; drop++) {
		let i = k;
		while (i > 0 && at(i - 1) <= at(i)) i--;
		while (i < k && at(i + 1) === at(i)) i++;
		if (at(i) === at(k)) {
			i = k;
			while (i < levels.length - 1 && at(i + 1) <= at(i)) i++;
			while (i > k && at(i - 1) === at(i)) i--;
		}
		levels[i] = at(i) + 1;
	}

	return levels;
};
