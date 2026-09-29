/**
 * 167. Two Sum II - Input Array Is Sorted
 *
 * Returns the positions, counting from 1, of the two numbers in `numbers`
 * (sorted in non-decreasing order) that add up to `target`. Exactly one
 * solution exists, and the same element can't be used twice.
 *
 * Two pointers move in from both ends: a sum that's too small moves the left
 * one right, a sum that's too large moves the right one left. Uses constant
 * extra space, as the problem requires.
 *
 * @see https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * twoSumIIInputArrayIsSorted([2, 7, 11, 15], 9); // [1, 2]
 */
export const twoSumIIInputArrayIsSorted = (
	numbers: readonly number[],
	target: number,
): number[] => {
	let left = 0;
	let right = numbers.length - 1;

	while (left < right) {
		const sum = (numbers[left] ?? 0) + (numbers[right] ?? 0);
		if (sum === target) return [left + 1, right + 1];
		if (sum < target) left++;
		else right--;
	}

	return [];
};
