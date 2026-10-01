/**
 * 1526. Minimum Number of Increments on Subarrays to Form a Target Array
 *
 * An operation adds one to every element of a subarray of an all-zero
 * array. Returns the fewest operations to reach `target`.
 *
 * Every rise from one element to the next needs that many new operations
 * to start there, while falls can be covered by ending operations; so the
 * answer is the sum of the rises, counting the first element as a rise from
 * 0.
 *
 * @see https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfIncrementsOnSubarraysToFormATargetArray([3, 1, 5, 4, 2]); // 7
 */
export const minimumNumberOfIncrementsOnSubarraysToFormATargetArray = (
	target: readonly number[],
): number => {
	let [operations, previous] = [0, 0];
	for (const value of target) {
		operations += Math.max(0, value - previous);
		previous = value;
	}
	return operations;
};
