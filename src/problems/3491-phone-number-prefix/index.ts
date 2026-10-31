/**
 * 3491. Phone Number Prefix
 *
 * Whether no phone number in the list is a prefix of another.
 *
 * After sorting, a number that's a prefix of another sorts right before
 * some number it prefixes, so check neighbours.
 *
 * @see https://leetcode.com/problems/phone-number-prefix/
 * @difficulty Easy
 * @timeComplexity O(n log n · L)
 * @spaceComplexity O(n)
 *
 * @example
 * phoneNumberPrefix(["1", "2", "4", "3"]); // true
 */
export const phoneNumberPrefix = (numbers: readonly string[]): boolean => {
	const sorted = numbers.toSorted();
	for (let i = 1; i < sorted.length; i++)
		if ((sorted[i] ?? "").startsWith(sorted[i - 1] ?? "")) return false;
	return true;
};
