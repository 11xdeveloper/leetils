/**
 * 3423. Maximum Difference Between Adjacent Elements in a Circular Array
 *
 * The largest absolute difference between neighbours in the circular array
 * `nums`, where the first and last are neighbours too.
 *
 * Compare each element with the one before it, wrapping round.
 *
 * @see https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDifferenceBetweenAdjacentElementsInACircularArray([1, 2, 4]); // 3
 */
export const maximumDifferenceBetweenAdjacentElementsInACircularArray = (
	nums: readonly number[],
): number => {
	let best = 0;
	nums.forEach((num, i) => {
		best = Math.max(best, Math.abs(num - (nums.at(i - 1) ?? 0)));
	});
	return best;
};
