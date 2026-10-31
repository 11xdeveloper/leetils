/**
 * 2206. Divide Array Into Equal Pairs
 *
 * Returns whether `nums` can be split into pairs of equal values.
 *
 * Every value must occur an even number of times.
 *
 * @see https://leetcode.com/problems/divide-array-into-equal-pairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideArrayIntoEqualPairs([3, 2, 3, 2, 2, 2]); // true
 */
export const divideArrayIntoEqualPairs = (nums: readonly number[]): boolean => {
	const unpaired = new Set<number>();
	for (const num of nums) {
		if (unpaired.has(num)) unpaired.delete(num);
		else unpaired.add(num);
	}
	return unpaired.size === 0;
};
