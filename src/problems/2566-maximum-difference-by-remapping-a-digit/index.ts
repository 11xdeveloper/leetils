/**
 * 2566. Maximum Difference by Remapping a Digit
 *
 * Remapping a digit replaces every occurrence of it in `num` with another
 * digit. Returns the largest value one remapping can give minus the
 * smallest.
 *
 * For the largest, turn the first digit that isn't 9 into 9; for the
 * smallest, turn the first digit into 0.
 *
 * @see https://leetcode.com/problems/maximum-difference-by-remapping-a-digit/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * maximumDifferenceByRemappingADigit(11891); // 99009
 */
export const maximumDifferenceByRemappingADigit = (num: number): number => {
	const digits = String(num);
	const remap = (from: string | undefined, to: string): number =>
		Number(from === undefined ? digits : digits.replaceAll(from, to));
	return (
		remap(
			[...digits].find((d) => d !== "9"),
			"9",
		) - remap(digits.charAt(0), "0")
	);
};
