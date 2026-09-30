/**
 * 1121. Divide Array Into Increasing Sequences
 *
 * Returns whether the sorted array `nums` can be split into disjoint
 * strictly increasing subsequences, each at least `k` long.
 *
 * Copies of the most common value must all go to different subsequences, so
 * at least `f` subsequences are needed, taking `f · k` numbers; that's
 * enough, since dealing the sorted array out round-robin to `f`
 * subsequences keeps each increasing.
 *
 * @see https://leetcode.com/problems/divide-array-into-increasing-sequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * divideArrayIntoIncreasingSequences([1, 2, 2, 3, 3, 4, 4], 3); // true
 */
export const divideArrayIntoIncreasingSequences = (
	nums: readonly number[],
	k: number,
): boolean => {
	let [run, longest] = [0, 0];
	for (let i = 0; i < nums.length; i++) {
		run = i > 0 && nums[i] === nums[i - 1] ? run + 1 : 1;
		longest = Math.max(longest, run);
	}
	return longest * k <= nums.length;
};
