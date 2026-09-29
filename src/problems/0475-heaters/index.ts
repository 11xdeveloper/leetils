/**
 * 475. Heaters
 *
 * Houses and heaters sit at positions on a line, and every heater warms
 * everything within the same radius. Returns the smallest radius that warms
 * every house.
 *
 * Each house needs the radius to reach its nearest heater. With the heaters
 * sorted, binary search finds the first heater at or after the house; the
 * nearest is that one or the one before.
 *
 * @see https://leetcode.com/problems/heaters/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m) for n houses and m heaters
 * @spaceComplexity O(m) for the sorted copy
 *
 * @example
 * heaters([1, 2, 3, 4], [1, 4]); // 1
 */
export const heaters = (
	houses: readonly number[],
	heaterPositions: readonly number[],
): number => {
	const sorted = heaterPositions.toSorted((a, b) => a - b);
	let radius = 0;

	for (const house of houses) {
		let low = 0;
		let high = sorted.length;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? 0) < house) low = mid + 1;
			else high = mid;
		}

		const after =
			low < sorted.length
				? (sorted[low] ?? 0) - house
				: Number.POSITIVE_INFINITY;
		const before =
			low > 0 ? house - (sorted[low - 1] ?? 0) : Number.POSITIVE_INFINITY;
		radius = Math.max(radius, Math.min(after, before));
	}

	return radius;
};
