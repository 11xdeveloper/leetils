/**
 * 3909. Compare Sums of Bitonic Parts
 *
 * `nums` rises to a single peak, then falls. Compares the sum up to the
 * peak with the sum from the peak on (both include it): 0 if the first is
 * larger, 1 if the second is, -1 if they're equal.
 *
 * @see https://leetcode.com/problems/compare-sums-of-bitonic-parts/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * compareSumsOfBitonicParts([1, 3, 2, 1]); // 1
 */
export const compareSumsOfBitonicParts = (nums: readonly number[]): number => {
	const peak = nums.indexOf(Math.max(...nums));
	let [rising, falling] = [0, 0];
	nums.forEach((num, i) => {
		if (i <= peak) rising += num;
		if (i >= peak) falling += num;
	});
	return rising > falling ? 0 : rising < falling ? 1 : -1;
};
