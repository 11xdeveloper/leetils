/**
 * 1063. Number of Valid Subarrays
 *
 * Counts the subarrays of `nums` whose first element is no larger than any
 * other element in them.
 *
 * A subarray starting at `i` stays valid until the first later element
 * smaller than `nums[i]`. A monotonic stack finds that position for every
 * `i`, and the valid subarrays starting at `i` are those ending before it.
 *
 * @see https://leetcode.com/problems/number-of-valid-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfValidSubarrays([1, 4, 2, 5, 3]); // 11
 */
export const numberOfValidSubarrays = (nums: readonly number[]): number => {
	let count = 0;
	const stack: number[] = [];
	for (let i = 0; i <= nums.length; i++) {
		const value = i < nums.length ? (nums[i] ?? 0) : Number.NEGATIVE_INFINITY;
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) > value)
			count += i - (stack.pop() ?? 0);
		stack.push(i);
	}
	return count;
};
