/**
 * 1365. How Many Numbers Are Smaller Than the Current Number
 *
 * Returns, for each element of `nums`, how many elements are smaller.
 *
 * Counting sort over the values (at most 100): a prefix sum of the counts
 * gives how many values fall below each.
 *
 * @see https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
 * @difficulty Easy
 * @timeComplexity O(n + k) for values up to k
 * @spaceComplexity O(k)
 *
 * @example
 * howManyNumbersAreSmallerThanTheCurrentNumber([8, 1, 2, 2, 3]); // [4, 0, 1, 1, 3]
 */
export const howManyNumbersAreSmallerThanTheCurrentNumber = (
	nums: readonly number[],
): number[] => {
	const below = new Array<number>(Math.max(...nums) + 2).fill(0);
	for (const num of nums) below[num + 1] = (below[num + 1] ?? 0) + 1;
	for (let v = 1; v < below.length; v++)
		below[v] = (below[v] ?? 0) + (below[v - 1] ?? 0);
	return nums.map((num) => below[num] ?? 0);
};
