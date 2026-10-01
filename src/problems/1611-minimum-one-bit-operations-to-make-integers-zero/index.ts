/**
 * 1611. Minimum One Bit Operations to Make Integers Zero
 *
 * One operation flips bit 0; another flips bit `i` when bit `i − 1` is 1
 * and every lower bit is 0. Returns the fewest operations taking `n` to 0.
 *
 * These moves step through the reflected Gray code, with `n` the code of
 * the number of steps from 0. Decoding a Gray code XORs together all of its
 * right shifts.
 *
 * @see https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOneBitOperationsToMakeIntegersZero(6); // 4
 */
export const minimumOneBitOperationsToMakeIntegersZero = (
	n: number,
): number => {
	let steps = 0;
	for (let rest = n; rest > 0; rest >>= 1) steps ^= rest;
	return steps;
};
