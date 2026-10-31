/**
 * 2554. Maximum Number of Integers to Choose From a Range I
 *
 * Returns the most distinct integers from 1 to `n` you can choose,
 * avoiding `banned`, while keeping their sum at most `maxSum`.
 *
 * Take allowed integers from smallest up until the budget runs out.
 *
 * @see https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-i/
 * @difficulty Medium
 * @timeComplexity O(n + b)
 * @spaceComplexity O(b)
 *
 * @example
 * maximumNumberOfIntegersToChooseFromARangeI([1, 6, 5], 5, 6); // 2
 */
export const maximumNumberOfIntegersToChooseFromARangeI = (
	banned: readonly number[],
	n: number,
	maxSum: number,
): number => {
	const skip = new Set(banned);
	let chosen = 0;
	let budget = maxSum;
	for (let x = 1; x <= n && x <= budget; x++) {
		if (skip.has(x)) continue;
		budget -= x;
		chosen++;
	}
	return chosen;
};
