/**
 * 493. Reverse Pairs
 *
 * Counts the pairs `i < j` with `nums[i] > 2 · nums[j]`.
 *
 * Merge sort: after sorting each half, the pairs with `i` in the left half
 * and `j` in the right are counted with two pointers, since as `i` moves up
 * through the sorted left half, the number of `j` it beats only grows. The
 * halves are then merged. It sorts bottom-up, so it doesn't recurse.
 *
 * @see https://leetcode.com/problems/reverse-pairs/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * reversePairs([2, 4, 3, 5, 1]); // 3
 */
export const reversePairs = (nums: readonly number[]): number => {
	const n = nums.length;
	let values = [...nums];
	let buffer = new Array<number>(n);
	let pairs = 0;

	for (let width = 1; width < n; width *= 2) {
		for (let low = 0; low < n; low += 2 * width) {
			const mid = Math.min(low + width, n);
			const high = Math.min(low + 2 * width, n);

			for (let i = low, j = mid; i < mid; i++) {
				while (j < high && (values[i] ?? 0) > 2 * (values[j] ?? 0)) j++;
				pairs += j - mid;
			}

			let i = low;
			let j = mid;
			for (let k = low; k < high; k++) {
				if (j >= high || (i < mid && (values[i] ?? 0) <= (values[j] ?? 0)))
					buffer[k] = values[i++] ?? 0;
				else buffer[k] = values[j++] ?? 0;
			}
		}
		[values, buffer] = [buffer, values];
	}

	return pairs;
};
