/**
 * 1385. Find the Distance Value Between Two Arrays
 *
 * Returns how many elements of `arr1` are more than `d` away from every
 * element of `arr2`.
 *
 * Sorts `arr2` and binary searches, for each element, the first value of
 * `arr2` at least `x − d`; the element counts if that value (if any) is
 * above `x + d`.
 *
 * @see https://leetcode.com/problems/find-the-distance-value-between-two-arrays/
 * @difficulty Easy
 * @timeComplexity O((m + n) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheDistanceValueBetweenTwoArrays([4, 5, 8], [10, 9, 1, 8], 2); // 2
 */
export const findTheDistanceValueBetweenTwoArrays = (
	arr1: readonly number[],
	arr2: readonly number[],
	d: number,
): number => {
	const sorted = arr2.toSorted((a, b) => a - b);
	return arr1.filter((x) => {
		let [low, high] = [0, sorted.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? 0) < x - d) low = mid + 1;
			else high = mid;
		}
		return low === sorted.length || (sorted[low] ?? 0) > x + d;
	}).length;
};
