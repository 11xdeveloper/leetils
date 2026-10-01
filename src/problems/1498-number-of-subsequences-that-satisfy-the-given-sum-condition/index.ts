/**
 * 1498. Number of Subsequences That Satisfy the Given Sum Condition
 *
 * Counts the non-empty subsequences of `nums` whose smallest and largest
 * elements add up to at most `target`, modulo 10^9 + 7.
 *
 * Only the chosen values matter, so sort. For each smallest element
 * `sorted[low]`, pointer `high` marks the largest partner that fits; any of
 * the elements in between may be added freely, giving `2^(high − low)`
 * subsequences. As `low` grows, `high` only moves left.
 *
 * @see https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfSubsequencesThatSatisfyTheGivenSumCondition([3, 5, 6, 7], 9); // 4
 */
export const numberOfSubsequencesThatSatisfyTheGivenSumCondition = (
	nums: readonly number[],
	target: number,
): number => {
	const MOD = 1_000_000_007;
	const sorted = nums.toSorted((a, b) => a - b);
	const powers = [1];
	for (let i = 1; i < sorted.length; i++)
		powers.push(((powers[i - 1] ?? 1) * 2) % MOD);
	let [count, low, high] = [0, 0, sorted.length - 1];
	while (low <= high) {
		if ((sorted[low] ?? 0) + (sorted[high] ?? 0) > target) {
			high--;
			continue;
		}
		count = (count + (powers[high - low] ?? 0)) % MOD;
		low++;
	}
	return count;
};
