/**
 * 1764. Form Array by Concatenating Subarrays of Another Array
 *
 * Returns whether disjoint subarrays of `nums`, in order, can equal each
 * of `groups` in turn.
 *
 * Greedily match each group at its earliest position after the previous
 * match; matching earlier never hurts later groups.
 *
 * @see https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array/
 * @difficulty Medium
 * @timeComplexity O(n · g) for total group length g
 * @spaceComplexity O(1)
 *
 * @example
 * formArrayByConcatenatingSubarraysOfAnotherArray([[1, -1, -1], [3, -2, 0]], [1, -1, 0, 1, -1, -1, 3, -2, 0]); // true
 */
export const formArrayByConcatenatingSubarraysOfAnotherArray = (
	groups: readonly (readonly number[])[],
	nums: readonly number[],
): boolean => {
	let start = 0;
	for (const group of groups) {
		while (
			start + group.length <= nums.length &&
			!group.every((value, i) => nums[start + i] === value)
		)
			start++;
		if (start + group.length > nums.length) return false;
		start += group.length;
	}
	return true;
};
