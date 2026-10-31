/**
 * 3069. Distribute Elements Into Two Arrays I
 *
 * Put `nums[0]` in one array and `nums[1]` in another, then add each later
 * element to the first array if its last element is larger, and to the
 * second otherwise. Returns the two
 * arrays joined.
 *
 * Simulate.
 *
 * @see https://leetcode.com/problems/distribute-elements-into-two-arrays-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * distributeElementsIntoTwoArraysI([5, 4, 3, 8]); // [5, 3, 4, 8]
 */
export const distributeElementsIntoTwoArraysI = (
	nums: readonly number[],
): number[] => {
	const first = [nums[0] ?? 0];
	const second = [nums[1] ?? 0];
	for (let i = 2; i < nums.length; i++)
		((first.at(-1) ?? 0) > (second.at(-1) ?? 0) ? first : second).push(
			nums[i] ?? 0,
		);
	return [...first, ...second];
};
