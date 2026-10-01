/**
 * 1576. Replace All ?'s to Avoid Consecutive Repeating Characters
 *
 * Replaces every `?` in `s` with a letter so no two neighbours match (the
 * other letters already don't).
 *
 * Each `?` has at most two neighbours, so one of `a`, `b` and `c` always
 * fits; fill them left to right.
 *
 * @see https://leetcode.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * replaceAllSToAvoidConsecutiveRepeatingCharacters("?zs"); // "azs"
 */
export const replaceAllSToAvoidConsecutiveRepeatingCharacters = (
	s: string,
): string => {
	const chars = [...s];
	chars.forEach((char, i) => {
		if (char !== "?") return;
		chars[i] =
			[..."abc"].find(
				(letter) => letter !== chars[i - 1] && letter !== chars[i + 1],
			) ?? "a";
	});
	return chars.join("");
};
