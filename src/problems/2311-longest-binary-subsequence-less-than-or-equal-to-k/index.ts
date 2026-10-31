/**
 * 2311. Longest Binary Subsequence Less Than or Equal to K
 *
 * Returns the length of the longest subsequence of the binary string `s`
 * whose value is at most `k` (leading zeros allowed).
 *
 * Every 0 is free. Add 1s from the right, the cheapest positions, while
 * the value stays within `k`.
 *
 * @see https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestBinarySubsequenceLessThanOrEqualToK("1001010", 5); // 5
 */
export const longestBinarySubsequenceLessThanOrEqualToK = (
	s: string,
	k: number,
): number => {
	let [length, value, power] = [0, 0, 1];
	for (let i = s.length - 1; i >= 0; i--) {
		if (s[i] === "0") length++;
		else if (power <= k && value + power <= k) {
			value += power;
			length++;
		}
		if (power <= k) power *= 2;
	}
	return length;
};
