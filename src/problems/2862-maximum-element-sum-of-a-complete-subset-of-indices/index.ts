/**
 * 2862. Maximum Element-Sum of a Complete Subset of Indices
 *
 * A set of indices, counting from 1, is complete if every pair multiplies
 * to a perfect square. Returns the largest sum of `nums` over a complete
 * set.
 *
 * Indices pair up exactly when they share a square-free part, so the
 * complete sets are within `{k · j²}` for each `k`. Sum each family.
 *
 * @see https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices/
 * @difficulty Hard
 * @timeComplexity O(n √n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumElementSumOfACompleteSubsetOfIndices([8, 7, 3, 5, 7, 2, 4, 9]); // 16
 */
export const maximumElementSumOfACompleteSubsetOfIndices = (
	nums: readonly number[],
): number => {
	let best = 0;
	for (let k = 1; k <= nums.length; k++) {
		let sum = 0;
		for (let j = 1; k * j * j <= nums.length; j++)
			sum += nums[k * j * j - 1] ?? 0;
		best = Math.max(best, sum);
	}
	return best;
};
