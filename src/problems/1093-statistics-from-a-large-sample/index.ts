/**
 * 1093. Statistics from a Large Sample
 *
 * `count[k]` is how many times `k` (0 to 255) appears in a sample. Returns
 * the sample's `[minimum, maximum, mean, median, mode]`; the mode is unique.
 *
 * One pass for the minimum, maximum, total, size and mode; a second pass
 * over the counts finds the middle element (or the two middle elements) for
 * the median.
 *
 * @see https://leetcode.com/problems/statistics-from-a-large-sample/
 * @difficulty Medium
 * @timeComplexity O(256)
 * @spaceComplexity O(1)
 *
 * @example
 * statisticsFromALargeSample([0, 1, 3, 4, ...new Array(252).fill(0)]); // [1, 3, 2.375, 2.5, 3]
 */
export const statisticsFromALargeSample = (
	count: readonly number[],
): number[] => {
	let [min, max, total, size, mode] = [-1, -1, 0, 0, 0];
	for (const [k, times] of count.entries()) {
		if (times === 0) continue;
		if (min === -1) min = k;
		max = k;
		total += k * times;
		size += times;
		if (times > (count[mode] ?? 0)) mode = k;
	}

	const valueAt = (position: number): number => {
		let seen = 0;
		for (const [k, times] of count.entries()) {
			seen += times;
			if (seen > position) return k;
		}
		return max;
	};
	const median =
		size % 2 === 1
			? valueAt((size - 1) / 2)
			: (valueAt(size / 2 - 1) + valueAt(size / 2)) / 2;
	return [min, max, total / size, median, mode];
};
