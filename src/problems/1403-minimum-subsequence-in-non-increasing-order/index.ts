/**
 * 1403. Minimum Subsequence in Non-Increasing Order
 *
 * Returns the fewest elements of `nums` whose sum exceeds the rest (the
 * largest-sum such set on ties), in non-increasing order.
 *
 * Takes the largest elements first until their sum passes half the total.
 *
 * @see https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSubsequenceInNonIncreasingOrder([4, 4, 7, 6, 7]); // [7, 7, 6]
 */
export const minimumSubsequenceInNonIncreasingOrder = (
	nums: readonly number[],
): number[] => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	const chosen: number[] = [];
	let sum = 0;
	for (const num of nums.toSorted((a, b) => b - a)) {
		if (2 * sum > total) break;
		chosen.push(num);
		sum += num;
	}
	return chosen;
};
