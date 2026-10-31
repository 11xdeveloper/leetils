/**
 * 3314. Construct the Minimum Bitwise Array I
 *
 * For each prime in `nums`, the smallest x with `x | (x + 1)` equal to it,
 * or -1 if there's none.
 *
 * `x | (x + 1)` sets x's lowest zero bit, so the target must be odd (2 has
 * no answer). Take the target's run of trailing ones and clear its top bit.
 *
 * @see https://leetcode.com/problems/construct-the-minimum-bitwise-array-i/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(n)
 *
 * @example
 * constructTheMinimumBitwiseArrayI([2, 3, 5, 7]); // [-1, 1, 4, 3]
 */
export const constructTheMinimumBitwiseArrayI = (
	nums: readonly number[],
): number[] =>
	nums.map((num) => {
		if (num % 2 === 0) return -1;
		let bit = 1;
		while (num & (bit << 1)) bit <<= 1;
		return num - bit;
	});
