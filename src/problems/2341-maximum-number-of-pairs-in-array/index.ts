/**
 * 2341. Maximum Number of Pairs in Array
 *
 * Repeatedly removes pairs of equal numbers. Returns `[pairs, leftover]`.
 *
 * @see https://leetcode.com/problems/maximum-number-of-pairs-in-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfPairsInArray([1, 3, 2, 1, 3, 2, 2]); // [3, 1]
 */
export const maximumNumberOfPairsInArray = (
	nums: readonly number[],
): number[] => {
	const unpaired = new Set<number>();
	let pairs = 0;
	for (const num of nums) {
		if (unpaired.delete(num)) pairs++;
		else unpaired.add(num);
	}
	return [pairs, unpaired.size];
};
