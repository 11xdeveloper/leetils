/**
 * 1200. Minimum Absolute Difference
 *
 * Returns every pair `[a, b]` of the distinct values in `arr`, with `a < b`,
 * whose difference is the smallest of any pair, in ascending order.
 *
 * After sorting, the closest pairs are neighbours, so one pass collects
 * the neighbouring pairs with the smallest gap.
 *
 * @see https://leetcode.com/problems/minimum-absolute-difference/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAbsoluteDifference([4, 2, 1, 3]); // [[1, 2], [2, 3], [3, 4]]
 */
export const minimumAbsoluteDifference = (
	arr: readonly number[],
): number[][] => {
	const sorted = arr.toSorted((a, b) => a - b);
	let smallest = Infinity;
	let pairs: number[][] = [];
	for (let i = 1; i < sorted.length; i++) {
		const [a = 0, b = 0] = [sorted[i - 1], sorted[i]];
		if (b - a < smallest) {
			smallest = b - a;
			pairs = [];
		}
		if (b - a === smallest) pairs.push([a, b]);
	}
	return pairs;
};
