/**
 * 3731. Find Missing Elements
 *
 * Lists, in increasing order, the integers between the smallest and
 * largest elements of `nums` that aren't in it.
 *
 * @see https://leetcode.com/problems/find-missing-elements/
 * @difficulty Easy
 * @timeComplexity O(n + V)
 * @spaceComplexity O(n)
 *
 * @example
 * findMissingElements([5, 1]); // [2, 3, 4]
 */
export const findMissingElements = (nums: readonly number[]): number[] => {
	const present = new Set(nums);
	const missing: number[] = [];
	for (let x = Math.min(...nums) + 1; x < Math.max(...nums); x++)
		if (!present.has(x)) missing.push(x);
	return missing;
};
