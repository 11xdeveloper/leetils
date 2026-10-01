/**
 * 1338. Reduce Array Size to The Half
 *
 * Returns the fewest distinct values whose removal (every copy) removes at
 * least half of `arr`.
 *
 * Removes the most common values first until half the array is gone.
 *
 * @see https://leetcode.com/problems/reduce-array-size-to-the-half/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * reduceArraySizeToTheHalf([3, 3, 3, 3, 5, 5, 5, 2, 2, 7]); // 2
 */
export const reduceArraySizeToTheHalf = (arr: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const value of arr) counts.set(value, (counts.get(value) ?? 0) + 1);
	let [removed, chosen] = [0, 0];
	for (const count of [...counts.values()].sort((a, b) => b - a)) {
		if (2 * removed >= arr.length) break;
		removed += count;
		chosen++;
	}
	return chosen;
};
