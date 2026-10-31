/**
 * 2364. Count Number of Bad Pairs
 *
 * A pair `i < j` is bad when `j - i ≠ nums[j] - nums[i]`. Counts them.
 *
 * Good pairs share `nums[i] - i`; subtract them from all pairs.
 *
 * @see https://leetcode.com/problems/count-number-of-bad-pairs/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfBadPairs([4, 1, 3, 3]); // 5
 */
export const countNumberOfBadPairs = (nums: readonly number[]): number => {
	const seen = new Map<number, number>();
	let bad = 0;
	for (const [i, num] of nums.entries()) {
		const key = num - i;
		const good = seen.get(key) ?? 0;
		bad += i - good;
		seen.set(key, good + 1);
	}
	return bad;
};
