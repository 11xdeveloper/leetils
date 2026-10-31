/**
 * 2475. Number of Unequal Triplets in Array
 *
 * Counts the index triplets `i < j < k` with pairwise different values.
 *
 * Group equal values; each group can be the middle of a triplet, pairing
 * with the groups before and after it.
 *
 * @see https://leetcode.com/problems/number-of-unequal-triplets-in-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfUnequalTripletsInArray([4, 4, 2, 4, 3]); // 3
 */
export const numberOfUnequalTripletsInArray = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let [triplets, before] = [0, 0];
	for (const count of counts.values()) {
		const after = nums.length - before - count;
		triplets += before * count * after;
		before += count;
	}
	return triplets;
};
