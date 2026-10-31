/**
 * 3211. Generate Binary Strings Without Adjacent Zeros
 *
 * Every binary string of length `n` with no two neighbouring 0s, in
 * lexicographic order.
 *
 * Build the strings a character at a time, only appending 0 after a 1.
 *
 * @see https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/
 * @difficulty Medium
 * @timeComplexity O(n · F(n)), for the F(n) strings produced
 * @spaceComplexity O(n · F(n))
 *
 * @example
 * generateBinaryStringsWithoutAdjacentZeros(3); // ["010", "011", "101", "110", "111"]
 */
export const generateBinaryStringsWithoutAdjacentZeros = (
	n: number,
): string[] => {
	let strings = ["0", "1"];
	for (let length = 1; length < n; length++)
		strings = strings.flatMap((s) =>
			s.endsWith("0") ? [`${s}1`] : [`${s}0`, `${s}1`],
		);
	return strings;
};
