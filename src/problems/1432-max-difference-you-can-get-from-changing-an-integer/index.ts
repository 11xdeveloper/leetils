/**
 * 1432. Max Difference You Can Get From Changing an Integer
 *
 * Replacing every occurrence of one digit of `num` with another, twice
 * independently, gives `a` and `b` (no leading zeros, not 0). Returns the
 * largest `a − b`.
 *
 * The largest `a` turns the first digit that isn't 9 into 9s. The smallest
 * `b` turns the leading digit into 1s if it isn't 1 already, and otherwise
 * turns the first later digit that isn't 0 or 1 into 0s.
 *
 * @see https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer/
 * @difficulty Medium
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * maxDifferenceYouCanGetFromChangingAnInteger(555); // 888
 */
export const maxDifferenceYouCanGetFromChangingAnInteger = (
	num: number,
): number => {
	const digits = String(num);
	const replace = (x: string | undefined, y: string) =>
		Number(x === undefined ? digits : digits.replaceAll(x, y));
	const high = replace(
		[...digits].find((d) => d !== "9"),
		"9",
	);
	const low =
		digits[0] !== "1"
			? replace(digits[0], "1")
			: replace(
					[...digits.slice(1)].find((d) => d !== "0" && d !== "1"),
					"0",
				);
	return high - low;
};
