/**
 * 1966. Binary Searchable Numbers in an Unsorted Array
 *
 * The randomised search picks any pivot and discards the side that can't
 * hold the target in a sorted array. Counts the (distinct) values found
 * whatever pivots are chosen.
 *
 * A value survives every pivot exactly when everything before it is
 * smaller and everything after it is larger; prefix maxima and suffix
 * minima check that.
 *
 * @see https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binarySearchableNumbersInAnUnsortedArray([-1, 5, 2]); // 1
 */
export const binarySearchableNumbersInAnUnsortedArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const suffixMin = new Array<number>(n + 1).fill(Infinity);
	for (let i = n - 1; i >= 0; i--)
		suffixMin[i] = Math.min(suffixMin[i + 1] ?? Infinity, nums[i] ?? 0);
	let [count, prefixMax] = [0, -Infinity];
	for (const [i, num] of nums.entries()) {
		if (num > prefixMax && num < (suffixMin[i + 1] ?? Infinity)) count++;
		prefixMax = Math.max(prefixMax, num);
	}
	return count;
};
