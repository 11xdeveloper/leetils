/**
 * 268. Missing Number
 *
 * `nums` holds `n` distinct numbers from the range 0 to `n`. Returns the one
 * number in that range it doesn't hold.
 *
 * XOR-ing every index and every value, plus `n`, cancels each number that's
 * present against its matching index, leaving only the missing one. Unlike
 * summing, this can't overflow in languages with fixed-size integers.
 *
 * @see https://leetcode.com/problems/missing-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * missingNumber([3, 0, 1]); // 2
 */
export const missingNumber = (nums: readonly number[]): number =>
	nums.reduce((missing, num, i) => missing ^ i ^ num, nums.length);
