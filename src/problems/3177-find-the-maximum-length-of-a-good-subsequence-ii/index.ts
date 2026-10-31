/**
 * 3177. Find the Maximum Length of a Good Subsequence II
 *
 * The longest subsequence of `nums` with at most `k` places where a value
 * differs from the next.
 *
 * Let `ending[j]` map each value to the longest subsequence ending in it
 * with j changes, and `best[j]` be the longest with j changes overall. A
 * new element either extends a subsequence ending in the same value, or
 * follows the best one with a change fewer. Going through j downwards uses
 * the values from before this element.
 *
 * @see https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * findTheMaximumLengthOfAGoodSubsequenceII([1, 2, 1, 1, 3], 2); // 4
 */
export const findTheMaximumLengthOfAGoodSubsequenceII = (
	nums: readonly number[],
	k: number,
): number => {
	const ending = Array.from({ length: k + 1 }, () => new Map<number, number>());
	const best = new Array<number>(k + 1).fill(0);
	for (const num of nums)
		for (let j = k; j >= 0; j--) {
			const map = ending[j];
			if (!map) continue;
			const length = Math.max(
				(map.get(num) ?? 0) + 1,
				j > 0 ? (best[j - 1] ?? 0) + 1 : 1,
			);
			map.set(num, length);
			best[j] = Math.max(best[j] ?? 0, length);
		}
	return Math.max(...best);
};
