/**
 * 1461. Check If a String Contains All Binary Codes of Size K
 *
 * Returns whether every binary string of length `k` appears in `s`.
 *
 * Slides a `k`-bit window along `s` as a number, marking each value seen,
 * and checks all `2^k` were.
 *
 * @see https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/
 * @difficulty Medium
 * @timeComplexity O(n + 2^k)
 * @spaceComplexity O(2^k)
 *
 * @example
 * checkIfAStringContainsAllBinaryCodesOfSizeK("00110110", 2); // true
 */
export const checkIfAStringContainsAllBinaryCodesOfSizeK = (
	s: string,
	k: number,
): boolean => {
	const total = 1 << k;
	if (s.length - k + 1 < total) return false;
	const seen = new Uint8Array(total);
	let [window, found] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		window = ((window << 1) | (s[i] === "1" ? 1 : 0)) & (total - 1);
		if (i >= k - 1 && !seen[window]) {
			seen[window] = 1;
			found++;
		}
	}
	return found === total;
};
