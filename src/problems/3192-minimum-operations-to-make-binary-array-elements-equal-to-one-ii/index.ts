/**
 * 3192. Minimum Operations to Make Binary Array Elements Equal to One II
 *
 * The fewest flips of a suffix (every bit from some index to the end)
 * needed to make the binary array all ones.
 *
 * Scan left to right, tracking whether an odd number of flips covers the
 * current position; flip whenever the bit as it currently stands is 0.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeBinaryArrayElementsEqualToOneII([0, 1, 1, 0, 1]); // 4
 */
export const minimumOperationsToMakeBinaryArrayElementsEqualToOneII = (
	nums: readonly number[],
): number => {
	let flips = 0;
	for (const bit of nums) if ((bit ^ (flips & 1)) === 0) flips++;
	return flips;
};
