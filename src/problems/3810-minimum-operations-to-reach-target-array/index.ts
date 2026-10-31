/**
 * 3810. Minimum Operations to Reach Target Array
 *
 * One operation picks a value x and sets every maximal run of x in `nums`
 * to the matching part of `target`. Returns the fewest operations making
 * `nums` equal `target`.
 *
 * Each mismatched position must be rewritten by an operation on its
 * original value, and one operation per such value fixes all of them
 * (positions already matching just get rewritten to themselves).
 *
 * @see https://leetcode.com/problems/minimum-operations-to-reach-target-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToReachTargetArray([1, 2, 3], [2, 1, 3]); // 2
 */
export const minimumOperationsToReachTargetArray = (
	nums: readonly number[],
	target: readonly number[],
): number => new Set(nums.filter((num, i) => num !== target[i])).size;
