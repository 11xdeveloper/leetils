/**
 * 1287. Element Appearing More Than 25% In Sorted Array
 *
 * In the sorted array `arr`, exactly one value appears in more than a
 * quarter of the positions. Returns it.
 *
 * A run longer than `n / 4` covers some position `i` with `arr[i]` equal to
 * `arr[i + ⌊n / 4⌋]`, so comparing each element with the one a quarter of
 * the array further on finds it.
 *
 * @see https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * elementAppearingMoreThan25InSortedArray([1, 2, 2, 6, 6, 6, 6, 7, 10]); // 6
 */
export const elementAppearingMoreThan25InSortedArray = (
	arr: readonly number[],
): number => {
	const quarter = Math.floor(arr.length / 4);
	for (let i = 0; i + quarter < arr.length; i++) {
		if (arr[i] === arr[i + quarter]) return arr[i] ?? 0;
	}
	return arr[0] ?? 0;
};
