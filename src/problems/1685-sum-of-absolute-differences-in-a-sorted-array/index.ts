/**
 * 1685. Sum of Absolute Differences in a Sorted Array
 *
 * For each element of the sorted `nums`, returns the sum of its absolute
 * differences with every element.
 *
 * Elements before index `i` are no larger and those after are no smaller,
 * so prefix sums give both parts directly.
 *
 * @see https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * sumOfAbsoluteDifferencesInASortedArray([2, 3, 5]); // [4, 3, 5]
 */
export const sumOfAbsoluteDifferencesInASortedArray = (
	nums: readonly number[],
): number[] => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	const n = nums.length;
	let before = 0;
	return nums.map((num, i) => {
		const result =
			num * i - before + (total - before - num) - num * (n - 1 - i);
		before += num;
		return result;
	});
};
