/**
 * 1433. Check If a String Can Break Another String
 *
 * String `x` breaks `y` (same length) if `x[i] ≥ y[i]` everywhere. Returns
 * whether some rearrangement of `s1` breaks some rearrangement of `s2`, or
 * the other way round.
 *
 * Pairing both strings sorted is the best chance either way, so sort and
 * check whether one dominates the other throughout.
 *
 * @see https://leetcode.com/problems/check-if-a-string-can-break-another-string/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAStringCanBreakAnotherString("abc", "xya"); // true
 */
export const checkIfAStringCanBreakAnotherString = (
	s1: string,
	s2: string,
): boolean => {
	const [a, b] = [[...s1].sort(), [...s2].sort()];
	const breaks = (x: string[], y: string[]) =>
		x.every((char, i) => char >= (y[i] ?? ""));
	return breaks(a, b) || breaks(b, a);
};
