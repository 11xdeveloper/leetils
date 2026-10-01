/**
 * 1702. Maximum Binary String After Change
 *
 * Replaces `00` with `10` or `10` with `01` any number of times. Returns
 * the largest binary string reachable.
 *
 * Ones before the first zero stay put. All later zeros can be slid left
 * to join it (via `10 → 01`), and then `00 → 10` turns all but the last of
 * that block into ones. So the result is all ones except a single zero at
 * `firstZero + zeros − 1`.
 *
 * @see https://leetcode.com/problems/maximum-binary-string-after-change/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBinaryStringAfterChange("000110"); // "111011"
 */
export const maximumBinaryStringAfterChange = (binary: string): string => {
	const firstZero = binary.indexOf("0");
	if (firstZero === -1) return binary;
	let zeros = 0;
	for (const char of binary) if (char === "0") zeros++;
	const position = firstZero + zeros - 1;
	return `${"1".repeat(position)}0${"1".repeat(binary.length - position - 1)}`;
};
