/**
 * 976. Largest Perimeter Triangle
 *
 * Returns the largest perimeter of a triangle with positive area whose
 * sides are three of the lengths in `nums`, or 0 if none can be formed.
 *
 * After sorting in descending order, the best triangle uses three
 * consecutive lengths: for each longest side, the next two are the best
 * chance of exceeding it.
 *
 * @see https://leetcode.com/problems/largest-perimeter-triangle/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * largestPerimeterTriangle([2, 1, 2]); // 5
 */
export const largestPerimeterTriangle = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => b - a);
	for (let i = 0; i + 2 < sorted.length; i++) {
		const [a = 0, b = 0, c = 0] = [sorted[i], sorted[i + 1], sorted[i + 2]];
		if (b + c > a) return a + b + c;
	}
	return 0;
};
