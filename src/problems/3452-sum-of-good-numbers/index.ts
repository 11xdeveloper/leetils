/**
 * 3452. Sum of Good Numbers
 *
 * An element is good if it's strictly bigger than the elements `k` places
 * before and after it, where those exist. Returns the sum of the good
 * elements.
 *
 * Check each element against its two partners.
 *
 * @see https://leetcode.com/problems/sum-of-good-numbers/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfGoodNumbers([1, 3, 2, 1, 5, 4], 2); // 12
 */
export const sumOfGoodNumbers = (nums: readonly number[], k: number): number =>
	nums.reduce((sum, num, i) => {
		const before = nums[i - k];
		const after = nums[i + k];
		return (before === undefined || num > before) &&
			(after === undefined || num > after)
			? sum + num
			: sum;
	}, 0);
