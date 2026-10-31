/**
 * 3681. Maximum XOR of Subsequences
 *
 * Pick two subsequences of `nums` (they may overlap) and XOR their XORs.
 * Returns the largest result.
 *
 * Overlaps cancel, so this is the largest XOR of any subset: build a
 * linear basis over GF(2) and greedily take each basis vector that raises
 * the result.
 *
 * @see https://leetcode.com/problems/maximum-xor-of-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(log V)
 *
 * @example
 * maximumXorOfSubsequences([5, 2]); // 7
 */
export const maximumXorOfSubsequences = (nums: readonly number[]): number => {
	const basis = new Array<number>(31).fill(0);
	for (let value of nums)
		for (let bit = 30; bit >= 0 && value; bit--) {
			if (!((value >> bit) & 1)) continue;
			if (!basis[bit]) {
				basis[bit] = value;
				value = 0;
			} else value ^= basis[bit] ?? 0;
		}
	let best = 0;
	for (let bit = 30; bit >= 0; bit--)
		best = Math.max(best, best ^ (basis[bit] ?? 0));
	return best;
};
