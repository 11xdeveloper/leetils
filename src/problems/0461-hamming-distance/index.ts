/**
 * 461. Hamming Distance
 *
 * Returns how many bit positions differ between `x` and `y`.
 *
 * Counts the set bits of `x ^ y`, clearing the lowest one each step with
 * `n & (n - 1)`.
 *
 * @see https://leetcode.com/problems/hamming-distance/
 * @difficulty Easy
 * @timeComplexity O(1), at most 32 steps
 * @spaceComplexity O(1)
 *
 * @example
 * hammingDistance(1, 4); // 2
 */
export const hammingDistance = (x: number, y: number): number => {
	let distance = 0;
	for (let bits = x ^ y; bits !== 0; bits &= bits - 1) distance++;
	return distance;
};
