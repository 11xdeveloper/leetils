/**
 * 3190. Find Minimum Operations to Make All Elements Divisible by Three
 *
 * The fewest ±1 steps to make every element of `nums` a multiple of 3.
 *
 * Any element that isn't one is a single step away.
 *
 * @see https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findMinimumOperationsToMakeAllElementsDivisibleByThree([1, 2, 3, 4]); // 3
 */
export const findMinimumOperationsToMakeAllElementsDivisibleByThree = (
	nums: readonly number[],
): number => nums.filter((num) => num % 3 !== 0).length;
