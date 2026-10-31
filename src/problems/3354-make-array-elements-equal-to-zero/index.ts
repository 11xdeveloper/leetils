/**
 * 3354. Make Array Elements Equal to Zero
 *
 * Start at an index holding 0, facing left or right. Step on; at a 0 keep
 * going, and at a positive value decrement it and turn around, until you
 * leave the array. Returns how many (start, direction) choices zero the
 * whole array.
 *
 * The walk bounces back and forth, taking one from each side in turn, so it
 * works when the totals on either side of the start are equal (either
 * direction) or differ by one (heading towards the larger side first).
 *
 * @see https://leetcode.com/problems/make-array-elements-equal-to-zero/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * makeArrayElementsEqualToZero([1, 0, 2, 0, 3]); // 2
 */
export const makeArrayElementsEqualToZero = (
	nums: readonly number[],
): number => {
	const total = nums.reduce((a, b) => a + b, 0);
	let left = 0;
	let selections = 0;
	for (const num of nums) {
		left += num;
		if (num !== 0) continue;
		const gap = Math.abs(total - 2 * left);
		if (gap === 0) selections += 2;
		else if (gap === 1) selections++;
	}
	return selections;
};
