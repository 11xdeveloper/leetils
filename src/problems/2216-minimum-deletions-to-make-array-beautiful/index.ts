/**
 * 2216. Minimum Deletions to Make Array Beautiful
 *
 * An array is beautiful when its length is even and each element at an
 * even index differs from the next. Returns the fewest deletions to make
 * `nums` beautiful.
 *
 * Greedily build pairs: delete an element equal to the one awaiting its
 * partner. Drop a final unpaired element.
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionsToMakeArrayBeautiful([1, 1, 2, 3, 5]); // 1
 */
export const minimumDeletionsToMakeArrayBeautiful = (
	nums: readonly number[],
): number => {
	let kept = 0;
	let waiting: number | undefined;
	for (const num of nums) {
		if (waiting === undefined) waiting = num;
		else if (num !== waiting) {
			kept += 2;
			waiting = undefined;
		}
	}
	return nums.length - kept;
};
