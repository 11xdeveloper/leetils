/**
 * 541. Reverse String II
 *
 * Reverses the first `k` characters of every `2k`-character block of `s`
 * (or all of the last block's characters, if fewer than `k` remain).
 *
 * Works through the blocks, reversing the first `k` characters of each.
 *
 * @see https://leetcode.com/problems/reverse-string-ii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseStringII("abcdefg", 2); // "bacdfeg"
 */
export const reverseStringII = (s: string, k: number): string => {
	const chars = [...s];
	for (let start = 0; start < chars.length; start += 2 * k) {
		for (
			let i = start, j = Math.min(start + k, chars.length) - 1;
			i < j;
			i++, j--
		) {
			[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
		}
	}
	return chars.join("");
};
