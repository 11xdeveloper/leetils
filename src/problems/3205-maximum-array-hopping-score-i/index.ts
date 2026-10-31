/**
 * 3205. Maximum Array Hopping Score I
 *
 * Hop from index 0 to the last index, always forwards; a hop from i to j
 * scores `(j - i) · nums[j]`. Returns the largest total score.
 *
 * Each unit step from t to t + 1 scores the value where its hop lands, and
 * the best it can be is the largest value after t. Hopping from suffix
 * maximum to suffix maximum achieves that for every step at once.
 *
 * @see https://leetcode.com/problems/maximum-array-hopping-score-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumArrayHoppingScoreI([1, 5, 8]); // 16
 */
export const maximumArrayHoppingScoreI = (nums: readonly number[]): number => {
	let score = 0;
	let laterMax = 0;
	for (let t = nums.length - 1; t > 0; t--) {
		laterMax = Math.max(laterMax, nums[t] ?? 0);
		score += laterMax;
	}
	return score;
};
