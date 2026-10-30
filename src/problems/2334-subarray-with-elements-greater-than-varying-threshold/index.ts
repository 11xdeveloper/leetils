/**
 * 2334. Subarray With Elements Greater Than Varying Threshold
 *
 * Returns the length `k` of any subarray whose elements all exceed
 * `threshold / k`, or -1.
 *
 * A subarray qualifies when its minimum does. For each element, monotonic
 * stacks give the widest subarray where it is the minimum; widening only
 * lowers the threshold, so check that width.
 *
 * @see https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * subarrayWithElementsGreaterThanVaryingThreshold([1, 3, 4, 3, 1], 6); // 3
 */
export const subarrayWithElementsGreaterThanVaryingThreshold = (
	nums: readonly number[],
	threshold: number,
): number => {
	const n = nums.length;
	const stack: number[] = [];
	for (let i = 0; i <= n; i++) {
		const value = i < n ? (nums[i] ?? 0) : -Infinity;
		while (stack.length && (nums[stack.at(-1) ?? 0] ?? 0) >= value) {
			const minimum = nums[stack.pop() ?? 0] ?? 0;
			const width = i - (stack.at(-1) ?? -1) - 1;
			if (minimum * width > threshold) return width;
		}
		stack.push(i);
	}
	return -1;
};
