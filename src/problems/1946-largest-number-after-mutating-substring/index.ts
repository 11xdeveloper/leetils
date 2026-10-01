/**
 * 1946. Largest Number After Mutating Substring
 *
 * Replacing each digit `d` of one substring of `num` with `change[d]`,
 * returns the largest number possible.
 *
 * Start at the first digit that would grow and keep going while digits
 * don't shrink.
 *
 * @see https://leetcode.com/problems/largest-number-after-mutating-substring/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestNumberAfterMutatingSubstring("021", [9, 4, 3, 5, 7, 2, 1, 9, 0, 6]); // "934"
 */
export const largestNumberAfterMutatingSubstring = (
	num: string,
	change: readonly number[],
): string => {
	const digits = Array.from(num, Number);
	let i = 0;
	while (i < digits.length && (change[digits[i] ?? 0] ?? 0) <= (digits[i] ?? 0))
		i++;
	for (
		;
		i < digits.length && (change[digits[i] ?? 0] ?? 0) >= (digits[i] ?? 0);
		i++
	)
		digits[i] = change[digits[i] ?? 0] ?? 0;
	return digits.join("");
};
