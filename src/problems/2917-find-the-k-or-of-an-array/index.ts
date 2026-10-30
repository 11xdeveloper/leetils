/**
 * 2917. Find the K-or of an Array
 *
 * The K-or sets each bit that at least `k` elements have set. Returns
 * it.
 *
 * Count each bit across the elements.
 *
 * @see https://leetcode.com/problems/find-the-k-or-of-an-array/
 * @difficulty Easy
 * @timeComplexity O(31 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheKOrOfAnArray([7, 12, 9, 8, 9, 15], 4); // 9
 */
export const findTheKOrOfAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	let result = 0;
	for (let bit = 0; bit < 31; bit++)
		if (nums.filter((num) => (num >> bit) & 1).length >= k) result |= 1 << bit;
	return result;
};
