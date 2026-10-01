/**
 * 761. Special Binary String
 *
 * A special binary string has equally many 0s and 1s, and every prefix has
 * at least as many 1s as 0s (like balanced parentheses, 1 opening). A move
 * swaps two consecutive non-empty special substrings. Returns the
 * lexicographically largest string reachable from the special string `s`.
 *
 * Every special string splits into top-level blocks `1 inner 0`, where
 * `inner` is special too. The best arrangement makes each inner as large as
 * possible (recursively), then sorts the blocks in descending order, since
 * moves can reorder neighbouring blocks freely.
 *
 * @see https://leetcode.com/problems/special-binary-string/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * specialBinaryString("11011000"); // "11100100"
 */
export const specialBinaryString = (s: string): string => {
	const blocks: string[] = [];
	let balance = 0;
	let start = 0;
	for (let i = 0; i < s.length; i++) {
		balance += s.charAt(i) === "1" ? 1 : -1;
		if (balance === 0) {
			blocks.push(`1${specialBinaryString(s.slice(start + 1, i))}0`);
			start = i + 1;
		}
	}
	return blocks.sort().reverse().join("");
};
