/**
 * 1512. Number of Good Pairs
 *
 * Counts the pairs `i < j` with `nums[i] === nums[j]`.
 *
 * Each element pairs with every equal element seen before it.
 *
 * @see https://leetcode.com/problems/number-of-good-pairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfGoodPairs([1, 2, 3, 1, 1, 3]); // 4
 */
export const numberOfGoodPairs = (nums: readonly number[]): number => {
	const seen = new Map<number, number>();
	let pairs = 0;
	for (const num of nums) {
		pairs += seen.get(num) ?? 0;
		seen.set(num, (seen.get(num) ?? 0) + 1);
	}
	return pairs;
};
