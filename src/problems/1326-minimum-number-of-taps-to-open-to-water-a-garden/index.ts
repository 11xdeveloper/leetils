/**
 * 1326. Minimum Number of Taps to Open to Water a Garden
 *
 * Tap `i` waters `[i − ranges[i], i + ranges[i]]`. Returns the fewest taps
 * covering the garden `[0, n]`, or -1 if that's impossible.
 *
 * Records, for each point, the furthest any tap starting at or before it
 * reaches. Then it's Jump Game II: extend coverage greedily, opening a new
 * tap each time the current coverage runs out.
 *
 * @see https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfTapsToOpenToWaterAGarden(5, [3, 4, 1, 1, 0, 0]); // 1
 */
export const minimumNumberOfTapsToOpenToWaterAGarden = (
	n: number,
	ranges: readonly number[],
): number => {
	const reach = new Array<number>(n + 1).fill(0);
	ranges.forEach((range, i) => {
		const start = Math.max(0, i - range);
		reach[start] = Math.max(reach[start] ?? 0, i + range);
	});
	let [taps, covered, furthest] = [0, 0, 0];
	for (let point = 0; point < n; point++) {
		furthest = Math.max(furthest, reach[point] ?? 0);
		if (point === covered) {
			if (furthest <= point) return -1;
			taps++;
			covered = furthest;
		}
	}
	return taps;
};
