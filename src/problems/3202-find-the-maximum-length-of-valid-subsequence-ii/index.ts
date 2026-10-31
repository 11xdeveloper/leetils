/**
 * 3202. Find the Maximum Length of Valid Subsequence II
 *
 * The longest subsequence of `nums` where every neighbouring pair's sum has
 * the same remainder mod `k`.
 *
 * Such a subsequence alternates between two remainders. Let `best[a][b]`
 * be the longest one ending in remainder a whose previous element had
 * remainder b; a new element with remainder a extends `best[b][a]`.
 *
 * @see https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k²)
 *
 * @example
 * findTheMaximumLengthOfValidSubsequenceII([1, 4, 2, 3, 1, 4], 3); // 4
 */
export const findTheMaximumLengthOfValidSubsequenceII = (
	nums: readonly number[],
	k: number,
): number => {
	const best = new Int32Array(k * k);
	let longest = 0;
	for (const num of nums) {
		const a = num % k;
		for (let b = 0; b < k; b++) {
			const length = (best[b * k + a] ?? 0) + 1;
			best[a * k + b] = length;
			longest = Math.max(longest, length);
		}
	}
	return longest;
};
