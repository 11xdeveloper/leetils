/**
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may return the combinations in any order.
 * 
 * The same number may be chosen from candidates an unlimited number of times.
 * Two combinations are unique if the frequency of at least one of the chosen numbers is different.
 * 
 * @param nums - Array of distinct integers to choose from
 * @param target - Target sum to achieve
 * @returns Array of arrays containing all possible combinations that sum to target
 * 
 * @example
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * Explanation:
 * 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
 * 7 is a candidate, and 7 = 7.
 * These are the only two combinations.
 * 
 * @example
 * Input: candidates = [2,3,5], target = 8
 * Output: [[2,2,2,2],[2,3,3],[3,5]]
 * 
 * @example
 * Input: candidates = [2], target = 1
 * Output: []
 * 
 * @timeComplexity O(N^(T/M)) - where N is the number of candidates, T is the target value, and M is the minimal value among candidates
 * @spaceComplexity O(T/M) - for the recursion stack
 */
export const combinationSum = (nums: number[], target: number): number[][] => {
	const result: number[][] = [];

	const recurse = (
		start: number,
		currentSum: number,
		currentCombination: number[],
	) => {
		if (currentSum === target) {
			result.push(currentCombination);
			return;
		}

		for (let i = start; i < nums.length; i++) {
			const num = nums[i];
			if (num === undefined) continue;

			if (currentSum + num > target) continue;

			recurse(i, currentSum + num, [...currentCombination, num]);
		}
	};

	recurse(0, 0, []);
	return result;
};
