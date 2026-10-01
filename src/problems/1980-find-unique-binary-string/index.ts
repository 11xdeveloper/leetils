/**
 * 1980. Find Unique Binary String
 *
 * Given `n` distinct binary strings of length `n`, returns a binary string
 * of length `n` that isn't among them.
 *
 * Cantor's diagonal argument: differ from the `i`-th string at position
 * `i`.
 *
 * @see https://leetcode.com/problems/find-unique-binary-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findUniqueBinaryString(["111", "011", "001"]); // "000"
 */
export const findUniqueBinaryString = (nums: readonly string[]): string =>
	nums.map((num, i) => (num[i] === "0" ? "1" : "0")).join("");
