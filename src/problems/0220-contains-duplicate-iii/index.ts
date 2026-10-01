/**
 * 220. Contains Duplicate III
 *
 * Returns whether `nums` has two values at indices at most `indexDiff` apart
 * whose values differ by at most `valueDiff`.
 *
 * Keeps the last `indexDiff` values in buckets of width `valueDiff + 1`. Two
 * values in the same bucket are always close enough, so each bucket needs
 * at most one value; otherwise only the two neighbouring buckets can hold a
 * close value.
 *
 * @see https://leetcode.com/problems/contains-duplicate-iii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(min(n, indexDiff))
 *
 * @example
 * containsDuplicateIII([1, 2, 3, 1], 3, 0); // true
 * containsDuplicateIII([1, 5, 9, 1, 5, 9], 2, 3); // false
 */
export const containsDuplicateIII = (
	nums: readonly number[],
	indexDiff: number,
	valueDiff: number,
): boolean => {
	const width = valueDiff + 1;
	const buckets = new Map<number, number>();

	for (const [i, num] of nums.entries()) {
		const bucket = Math.floor(num / width);
		if (buckets.has(bucket)) return true;
		const below = buckets.get(bucket - 1);
		if (below !== undefined && num - below <= valueDiff) return true;
		const above = buckets.get(bucket + 1);
		if (above !== undefined && above - num <= valueDiff) return true;

		buckets.set(bucket, num);
		if (i >= indexDiff) {
			const old = nums[i - indexDiff] ?? 0;
			buckets.delete(Math.floor(old / width));
		}
	}

	return false;
};
