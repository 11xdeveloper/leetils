/**
 * 611. Valid Triangle Number
 *
 * Counts the triples of elements of `nums` (by index) that could be the
 * side lengths of a triangle: each side shorter than the other two
 * combined.
 *
 * After sorting, a triple is valid when its two shorter sides sum to more
 * than the longest. For each choice of longest side, two pointers over the
 * shorter ones count the valid pairs in linear time: when the ends work,
 * so does every pair between them with the same right end.
 *
 * @see https://leetcode.com/problems/valid-triangle-number/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * validTriangleNumber([2, 2, 3, 4]); // 3
 */
export const validTriangleNumber = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let count = 0;

	for (let longest = sorted.length - 1; longest >= 2; longest--) {
		const side = sorted[longest] ?? 0;
		for (let low = 0, high = longest - 1; low < high; ) {
			if ((sorted[low] ?? 0) + (sorted[high] ?? 0) > side) {
				count += high - low;
				high--;
			} else {
				low++;
			}
		}
	}

	return count;
};
