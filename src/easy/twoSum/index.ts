/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * @param nums - Array of integers
 * @param target - Target sum to find
 * @returns Array containing the indices of two numbers that add up to target
 *
 * @example
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]
 *
 * @example
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * @example
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * @timeComplexity O(n) - Single pass through the array
 * @spaceComplexity O(n) - Using a Map to store complements
 */
export const twoSum = (nums: number[], target: number): number[] => {
	const mapping = new Map<number, number>();

	for (const [i, num] of nums.entries()) {
		const search = mapping.get(num);
		if (search !== undefined) return [search, i];
		mapping.set(target - num, i);
	}

	return [];
};
