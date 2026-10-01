/**
 * 1545. Find Kth Bit in Nth Binary String
 *
 * `S1 = "0"` and `S(i) = S(i−1) + "1" + reverse(invert(S(i−1)))`. Returns the
 * `k`th bit of `S(n)`.
 *
 * `S(n)` has length `2^n − 1` with a 1 in the middle. A position in the
 * left half is the same bit of `S(n−1)`; one in the right half mirrors to
 * the left, flipped. Walking down the levels finds the bit.
 *
 * @see https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findKthBitInNthBinaryString(4, 11); // "1"
 */
export const findKthBitInNthBinaryString = (n: number, k: number): string => {
	let [position, flipped] = [k, false];
	for (let level = n; level > 1; level--) {
		const middle = 2 ** (level - 1);
		if (position === middle) return flipped ? "0" : "1";
		if (position > middle) {
			position = 2 * middle - position;
			flipped = !flipped;
		}
	}
	return flipped ? "1" : "0";
};
