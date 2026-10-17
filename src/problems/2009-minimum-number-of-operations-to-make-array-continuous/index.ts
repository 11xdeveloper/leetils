/**
 * 2009. Minimum Number of Operations to Make Array Continuous
 *
 * An array is continuous when its values are distinct and its maximum
 * minus minimum is its length minus one. Returns the fewest elements to
 * replace to make `nums` continuous.
 *
 * Keep the most distinct values that fit in a range `[v, v + n - 1]`:
 * slide a window over the sorted distinct values.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeArrayContinuous([1, 2, 3, 5, 6]); // 1
 */
export const minimumNumberOfOperationsToMakeArrayContinuous = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const values = [...new Set(nums)].sort((a, b) => a - b);
	let [kept, end] = [0, 0];
	for (const [start, low] of values.entries()) {
		while (end < values.length && (values[end] ?? 0) <= low + n - 1) end++;
		kept = Math.max(kept, end - start);
	}
	return n - kept;
};
