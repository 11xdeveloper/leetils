/**
 * 1762. Buildings With an Ocean View
 *
 * The ocean is to the right of the buildings. Returns, in increasing
 * order, the indices of buildings taller than every building to their
 * right.
 *
 * Scan from the right keeping the tallest height seen.
 *
 * @see https://leetcode.com/problems/buildings-with-an-ocean-view/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * buildingsWithAnOceanView([4, 2, 3, 1]); // [0, 2, 3]
 */
export const buildingsWithAnOceanView = (
	heights: readonly number[],
): number[] => {
	const views: number[] = [];
	let tallest = -Infinity;
	for (let i = heights.length - 1; i >= 0; i--) {
		const height = heights[i] ?? 0;
		if (height > tallest) views.push(i);
		tallest = Math.max(tallest, height);
	}
	return views.reverse();
};
