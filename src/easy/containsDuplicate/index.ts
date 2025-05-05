/**
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 * @param nums - Array of integers to check for duplicates
 * @returns true if any value appears at least twice, false otherwise
 *
 * @example
 * Input: nums = [1,2,3,1]
 * Output: true
 * Explanation: 1 appears twice
 *
 * @example
 * Input: nums = [1,2,3,4]
 * Output: false
 * Explanation: All elements are distinct
 *
 * @example
 * Input: nums = [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 * Explanation: Multiple elements appear more than once
 *
 * @timeComplexity O(n) - Single pass through the array to create Set
 * @spaceComplexity O(n) - Using a Set to store unique values
 */
export const containsDuplicate = (nums: number[]): boolean =>
	new Set(nums).size !== nums.length;
