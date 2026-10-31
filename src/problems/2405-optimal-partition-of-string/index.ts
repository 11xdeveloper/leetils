/**
 * 2405. Optimal Partition of String
 *
 * Splits `s` into the fewest substrings with no repeated letter.
 *
 * Start a new substring whenever a letter repeats.
 *
 * @see https://leetcode.com/problems/optimal-partition-of-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * optimalPartitionOfString("abacaba"); // 4
 */
export const optimalPartitionOfString = (s: string): number => {
	let [parts, seen] = [1, 0];
	for (const char of s) {
		const bit = 1 << (char.charCodeAt(0) - 97);
		if (seen & bit) [parts, seen] = [parts + 1, 0];
		seen |= bit;
	}
	return parts;
};
