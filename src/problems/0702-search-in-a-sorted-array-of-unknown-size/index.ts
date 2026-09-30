/** The interface LeetCode provides: `get(i)` returns the `i`th element, or 2^31 - 1 past the end. */
interface ArrayReader {
	get(index: number): number;
}

/**
 * 702. Search in a Sorted Array of Unknown Size
 *
 * Returns the index of `target` in a sorted array of distinct numbers that
 * can only be read through `reader.get(i)`, which returns 2^31 - 1 past the
 * end, or -1 if it's missing. The length isn't known.
 *
 * Doubles an upper bound until it passes the target (reads past the end
 * count as too large), then binary searches below it.
 *
 * @see https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/
 * @difficulty Medium
 * @timeComplexity O(log k) where k is the target's position
 * @spaceComplexity O(1)
 *
 * @example
 * searchInASortedArrayOfUnknownSize({ get: (i) => [-1, 0, 3, 5, 9, 12][i] ?? 2 ** 31 - 1 }, 9); // 4
 */
export const searchInASortedArrayOfUnknownSize = (
	reader: ArrayReader,
	target: number,
): number => {
	let high = 1;
	while (reader.get(high) < target) high *= 2;
	let low = Math.floor(high / 2);

	while (low <= high) {
		const mid = (low + high) >>> 1;
		const value = reader.get(mid);
		if (value === target) return mid;
		if (value < target) low = mid + 1;
		else high = mid - 1;
	}
	return -1;
};
