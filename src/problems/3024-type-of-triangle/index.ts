/**
 * 3024. Type of Triangle
 *
 * Whether three side lengths make an equilateral, isosceles or scalene
 * triangle, or no triangle at all.
 *
 * Check the triangle inequality on the sorted sides, then count distinct
 * lengths.
 *
 * @see https://leetcode.com/problems/type-of-triangle/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * typeOfTriangle([3, 4, 5]); // "scalene"
 */
export const typeOfTriangle = (
	nums: readonly number[],
): "equilateral" | "isosceles" | "scalene" | "none" => {
	const [a = 0, b = 0, c = 0] = nums.toSorted((p, q) => p - q);
	if (a + b <= c) return "none";
	const distinct = new Set(nums).size;
	return distinct === 1
		? "equilateral"
		: distinct === 2
			? "isosceles"
			: "scalene";
};
