/**
 * 2104. Sum of Subarray Ranges
 *
 * Returns the sum, over all subarrays, of their largest minus smallest
 * element.
 *
 * That is the sum of subarray maximums minus the sum of minimums. A
 * monotonic stack finds, for each element, how many subarrays it is the
 * maximum (or minimum) of, breaking ties towards the left.
 *
 * @see https://leetcode.com/problems/sum-of-subarray-ranges/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfSubarrayRanges([1, 3, 3]); // 4
 */
export const sumOfSubarrayRanges = (nums: readonly number[]): number => {
	/** The sum over subarrays of the element that `before` puts first. */
	const sumOfExtremes = (before: (a: number, b: number) => boolean): number => {
		const n = nums.length;
		let total = 0;
		const stack: number[] = [];
		for (let i = 0; i <= n; i++) {
			const value = nums[i];
			for (
				let top = stack.at(-1);
				top !== undefined &&
				(value === undefined || !before(nums[top] ?? 0, value));
				top = stack.at(-1)
			) {
				stack.pop();
				const left = top - (stack.at(-1) ?? -1);
				total += (nums[top] ?? 0) * left * (i - top);
			}
			stack.push(i);
		}
		return total;
	};
	return sumOfExtremes((a, b) => a > b) - sumOfExtremes((a, b) => a < b);
};
