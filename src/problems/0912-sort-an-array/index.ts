/**
 * 912. Sort an Array
 *
 * Returns `nums` sorted in ascending order, in O(n log n) time without the
 * built-in sort.
 *
 * Bottom-up merge sort: merges runs of width 1, 2, 4, … back and forth
 * between two buffers. It's stable, needs no recursion, and is O(n log n)
 * in every case.
 *
 * @see https://leetcode.com/problems/sort-an-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortAnArray([5, 2, 3, 1]); // [1, 2, 3, 5]
 */
export const sortAnArray = (nums: readonly number[]): number[] => {
	const n = nums.length;
	let source = [...nums];
	let target = new Array<number>(n);
	for (let width = 1; width < n; width *= 2) {
		for (let low = 0; low < n; low += 2 * width) {
			const mid = Math.min(low + width, n);
			const high = Math.min(low + 2 * width, n);
			let i = low;
			let j = mid;
			for (let k = low; k < high; k++) {
				if (j >= high || (i < mid && (source[i] ?? 0) <= (source[j] ?? 0)))
					target[k] = source[i++] ?? 0;
				else target[k] = source[j++] ?? 0;
			}
		}
		[source, target] = [target, source];
	}
	return source;
};
