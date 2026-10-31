/**
 * 2109. Adding Spaces to a String
 *
 * Inserts a space before each of the strictly increasing indices in
 * `spaces`.
 *
 * Slice between consecutive indices and join with spaces.
 *
 * @see https://leetcode.com/problems/adding-spaces-to-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * addingSpacesToAString("LeetcodeHelpsMeLearn", [8, 13, 15]); // "Leetcode Helps Me Learn"
 */
export const addingSpacesToAString = (
	s: string,
	spaces: readonly number[],
): string =>
	[0, ...spaces]
		.map((start, i) => s.slice(start, spaces[i] ?? s.length))
		.join(" ");
