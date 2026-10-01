/**
 * 1909. Remove One Element to Make the Array Strictly Increasing
 *
 * Returns whether removing exactly one element leaves `nums` strictly
 * increasing.
 *
 * At the first descent, the culprit is either element of the pair; try
 * removing each and check the rest.
 *
 * @see https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeOneElementToMakeTheArrayStrictlyIncreasing([1, 2, 10, 5, 7]); // true
 */
export const removeOneElementToMakeTheArrayStrictlyIncreasing = (
	nums: readonly number[],
): boolean => {
	const increasingWithout = (skip: number) => {
		let previous = -Infinity;
		for (const [i, num] of nums.entries()) {
			if (i === skip) continue;
			if (num <= previous) return false;
			previous = num;
		}
		return true;
	};
	const descent = nums.findIndex(
		(num, i) => i > 0 && num <= (nums[i - 1] ?? 0),
	);
	if (descent === -1) return true;
	return increasingWithout(descent - 1) || increasingWithout(descent);
};
