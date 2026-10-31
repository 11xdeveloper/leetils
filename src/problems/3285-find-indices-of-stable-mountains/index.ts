/**
 * 3285. Find Indices of Stable Mountains
 *
 * The indices of mountains whose left neighbour is taller than `threshold`.
 *
 * Check each mountain after the first.
 *
 * @see https://leetcode.com/problems/find-indices-of-stable-mountains/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findIndicesOfStableMountains([1, 2, 3, 4, 5], 2); // [3, 4]
 */
export const findIndicesOfStableMountains = (
	height: readonly number[],
	threshold: number,
): number[] => {
	const stable: number[] = [];
	for (let i = 1; i < height.length; i++)
		if ((height[i - 1] ?? 0) > threshold) stable.push(i);
	return stable;
};
