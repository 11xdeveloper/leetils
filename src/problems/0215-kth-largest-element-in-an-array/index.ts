/**
 * 215. Kth Largest Element in an Array
 *
 * Returns the `k`th largest value in `nums`, counting repeated values
 * separately, without sorting.
 *
 * Quickselect on a copy: partitions the values around a random pivot into
 * larger, equal and smaller groups, then continues only in the group that
 * holds the answer. The three-way split keeps it fast when many values are
 * equal, and the random pivot makes quadratic time vanishingly unlikely.
 *
 * @see https://leetcode.com/problems/kth-largest-element-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n) on average
 * @spaceComplexity O(n) for the copy
 *
 * @example
 * kthLargestElementInAnArray([3, 2, 3, 1, 2, 4, 5, 5, 6], 4); // 4
 */
export const kthLargestElementInAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	let values = [...nums];
	let rank = k;

	for (;;) {
		const pivot = values[Math.floor(Math.random() * values.length)] ?? 0;
		const larger = values.filter((value) => value > pivot);
		const equal = values.filter((value) => value === pivot).length;

		if (rank <= larger.length) {
			values = larger;
		} else if (rank <= larger.length + equal) {
			return pivot;
		} else {
			rank -= larger.length + equal;
			values = values.filter((value) => value < pivot);
		}
	}
};
