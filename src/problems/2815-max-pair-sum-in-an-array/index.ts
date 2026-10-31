/**
 * 2815. Max Pair Sum in an Array
 *
 * Returns the largest sum of two numbers whose largest digits are equal,
 * or -1 if there is no such pair.
 *
 * Keep the largest number seen for each largest digit.
 *
 * @see https://leetcode.com/problems/max-pair-sum-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n log m), where `m` is the largest number
 * @spaceComplexity O(1)
 *
 * @example
 * maxPairSumInAnArray([51, 71, 17, 24, 42]); // 88
 */
export const maxPairSumInAnArray = (nums: readonly number[]): number => {
	const largestFor = Array.from({ length: 10 }, () => -1);
	let best = -1;
	for (const num of nums) {
		const digit = Math.max(...[...String(num)].map(Number));
		const partner = largestFor[digit] ?? -1;
		if (partner >= 0) best = Math.max(best, partner + num);
		largestFor[digit] = Math.max(partner, num);
	}
	return best;
};
