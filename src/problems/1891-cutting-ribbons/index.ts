/**
 * 1891. Cutting Ribbons
 *
 * Cutting `ribbons` into pieces, returns the largest length `x` such that
 * at least `k` pieces of length exactly `x` can be made, or 0.
 *
 * Binary search `x`: a ribbon of length `r` yields `⌊r / x⌋` pieces.
 *
 * @see https://leetcode.com/problems/cutting-ribbons/
 * @difficulty Medium
 * @timeComplexity O(n log M) for the longest ribbon M
 * @spaceComplexity O(1)
 *
 * @example
 * cuttingRibbons([7, 5, 9], 4); // 4
 */
export const cuttingRibbons = (
	ribbons: readonly number[],
	k: number,
): number => {
	let [low, high] = [0, Math.max(...ribbons)];
	while (low < high) {
		const length = Math.ceil((low + high) / 2);
		const pieces = ribbons.reduce(
			(sum, ribbon) => sum + Math.floor(ribbon / length),
			0,
		);
		if (pieces >= k) low = length;
		else high = length - 1;
	}
	return low;
};
