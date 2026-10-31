/**
 * 4006. Count Valid Prefixes
 *
 * Counts the prefixes of the binary string `s` that can be rearranged to
 * alternate, i.e. whose counts of 0s and 1s differ by at most one.
 *
 * @see https://leetcode.com/problems/count-valid-prefixes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countValidPrefixes("00101"); // 3
 */
export const countValidPrefixes = (s: string): number => {
	let [balance, count] = [0, 0];
	for (const c of s) {
		balance += c === "1" ? 1 : -1;
		if (Math.abs(balance) <= 1) count++;
	}
	return count;
};
