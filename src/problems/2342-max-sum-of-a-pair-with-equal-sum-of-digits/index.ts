/**
 * 2342. Max Sum of a Pair With Equal Sum of Digits
 *
 * Returns the largest `nums[i] + nums[j]` (i ≠ j) whose digit sums match,
 * or -1.
 *
 * Keep the largest number seen for each digit sum.
 *
 * @see https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * maxSumOfAPairWithEqualSumOfDigits([18, 43, 36, 13, 7]); // 54
 */
export const maxSumOfAPairWithEqualSumOfDigits = (
	nums: readonly number[],
): number => {
	const largest = new Map<number, number>();
	let best = -1;
	for (const num of nums) {
		let digits = 0;
		for (let rest = num; rest > 0; rest = Math.floor(rest / 10))
			digits += rest % 10;
		const previous = largest.get(digits);
		if (previous !== undefined) best = Math.max(best, previous + num);
		largest.set(digits, Math.max(previous ?? 0, num));
	}
	return best;
};
