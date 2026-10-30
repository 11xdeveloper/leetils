/**
 * 2708. Maximum Strength of a Group
 *
 * Returns the largest product of a non-empty group of elements of `nums`.
 *
 * Take every positive number and the negatives in pairs, most negative
 * first. If that takes nothing, the best is the single largest element.
 *
 * @see https://leetcode.com/problems/maximum-strength-of-a-group/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumStrengthOfAGroup([3, -1, -5, 2, 5, -9]); // 1350
 */
export const maximumStrengthOfAGroup = (nums: readonly number[]): number => {
	const negatives = nums.filter((num) => num < 0).sort((a, b) => a - b);
	const taken = [
		...nums.filter((num) => num > 0),
		...negatives.slice(0, negatives.length - (negatives.length % 2)),
	];
	if (taken.length === 0) return Math.max(...nums);
	return taken.reduce((product, num) => product * num, 1);
};
