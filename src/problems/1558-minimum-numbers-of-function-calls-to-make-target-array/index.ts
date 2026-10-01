/**
 * 1558. Minimum Numbers of Function Calls to Make Target Array
 *
 * Starting from zeros, each call either adds 1 to one element or doubles
 * every element. Returns the fewest calls to reach `nums`.
 *
 * Each 1 bit of each number needs its own increment, and the doublings are
 * shared: as many as the longest number has bits after its first.
 *
 * @see https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumbersOfFunctionCallsToMakeTargetArray([4, 2, 5]); // 6
 */
export const minimumNumbersOfFunctionCallsToMakeTargetArray = (
	nums: readonly number[],
): number => {
	let [increments, doublings] = [0, 0];
	for (const num of nums) {
		let bits = 0;
		for (let rest = num; rest > 0; rest = Math.floor(rest / 2)) {
			increments += rest % 2;
			bits++;
		}
		doublings = Math.max(doublings, bits - 1);
	}
	return increments + doublings;
};
