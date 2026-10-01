/**
 * 482. License Key Formatting
 *
 * Reformats a license key of letters, digits and dashes so that its
 * characters, upper-cased, are in groups of `k` separated by dashes. Only
 * the first group may be shorter, but it must have at least one character.
 *
 * Strips the dashes, then cuts groups of `k` from the end, so the leftover
 * falls in the first group.
 *
 * @see https://leetcode.com/problems/license-key-formatting/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * licenseKeyFormatting("5F3Z-2e-9-w", 4); // "5F3Z-2E9W"
 */
export const licenseKeyFormatting = (s: string, k: number): string => {
	const characters = s.replaceAll("-", "").toUpperCase();
	const groups: string[] = [];
	for (let end = characters.length; end > 0; end -= k)
		groups.push(characters.slice(Math.max(0, end - k), end));
	return groups.reverse().join("-");
};
