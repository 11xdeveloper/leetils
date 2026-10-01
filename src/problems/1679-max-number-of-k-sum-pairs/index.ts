/**
 * 1679. Max Number of K-Sum Pairs
 *
 * Returns the most operations removing two elements of `nums` that sum to
 * `k`.
 *
 * Pairs each number with a waiting complement when there is one, and
 * otherwise leaves it waiting.
 *
 * @see https://leetcode.com/problems/max-number-of-k-sum-pairs/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maxNumberOfKSumPairs([1, 2, 3, 4], 5); // 2
 */
export const maxNumberOfKSumPairs = (
	nums: readonly number[],
	k: number,
): number => {
	const waiting = new Map<number, number>();
	let pairs = 0;
	for (const num of nums) {
		const complement = waiting.get(k - num) ?? 0;
		if (complement > 0) {
			waiting.set(k - num, complement - 1);
			pairs++;
		} else {
			waiting.set(num, (waiting.get(num) ?? 0) + 1);
		}
	}
	return pairs;
};
