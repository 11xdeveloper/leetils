/**
 * 2865. Beautiful Towers I
 *
 * Tower heights must form a mountain, rising then falling, with each at
 * least 1 and at most `maxHeights[i]`. Returns the largest total height.
 *
 * Try each peak: walking outwards, each tower is the smaller of its limit
 * and its inner neighbour.
 *
 * @see https://leetcode.com/problems/beautiful-towers-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * beautifulTowersI([6, 5, 3, 9, 2, 7]); // 22
 */
export const beautifulTowersI = (maxHeights: readonly number[]): number => {
	const n = maxHeights.length;
	let best = 0;
	for (let peak = 0; peak < n; peak++) {
		let total = maxHeights[peak] ?? 0;
		for (let i = peak - 1, height = total; i >= 0; i--) {
			height = Math.min(height, maxHeights[i] ?? 0);
			total += height;
		}
		for (let i = peak + 1, height = maxHeights[peak] ?? 0; i < n; i++) {
			height = Math.min(height, maxHeights[i] ?? 0);
			total += height;
		}
		best = Math.max(best, total);
	}
	return best;
};
