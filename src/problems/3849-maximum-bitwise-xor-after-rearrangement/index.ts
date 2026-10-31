/**
 * 3849. Maximum Bitwise XOR After Rearrangement
 *
 * Rearrange the bits of `t` to maximise `s` XOR `t`, returned as a binary
 * string.
 *
 * From the most significant bit, pair each bit of s with the opposite bit
 * of t while any are left.
 *
 * @see https://leetcode.com/problems/maximum-bitwise-xor-after-rearrangement/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBitwiseXorAfterRearrangement("0110", "1110"); // "1101"
 */
export const maximumBitwiseXorAfterRearrangement = (
	s: string,
	t: string,
): string => {
	let ones = 0;
	for (const c of t) if (c === "1") ones++;
	let zeros = t.length - ones;
	let result = "";
	for (const c of s) {
		if (c === "0" ? ones > 0 : zeros > 0) {
			if (c === "0") ones--;
			else zeros--;
			result += "1";
		} else {
			if (c === "0") zeros--;
			else ones--;
			result += "0";
		}
	}
	return result;
};
