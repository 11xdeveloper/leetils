/**
 * 774. Minimize Max Distance to Gas Station
 *
 * Given sorted station positions, adds `k` stations anywhere to make the
 * largest gap between neighbouring stations as small as possible, and
 * returns that gap (within 10^-6).
 *
 * Binary search on the gap `d`: a gap of length `g` needs `⌈g / d⌉ - 1`
 * new stations, so `d` is achievable if those add up to at most `k`.
 *
 * @see https://leetcode.com/problems/minimize-max-distance-to-gas-station/
 * @difficulty Hard
 * @timeComplexity O(n · log(W / ε)) where W is the widest gap
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeMaxDistanceToGasStation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9); // 0.5
 */
export const minimizeMaxDistanceToGasStation = (
	stations: readonly number[],
	k: number,
): number => {
	let low = 0;
	let high = (stations.at(-1) ?? 0) - (stations[0] ?? 0);
	while (high - low > 1e-7) {
		const mid = (low + high) / 2;
		let needed = 0;
		for (let i = 1; i < stations.length; i++)
			needed +=
				Math.ceil(((stations[i] ?? 0) - (stations[i - 1] ?? 0)) / mid) - 1;
		if (needed <= k) high = mid;
		else low = mid;
	}
	return high;
};
