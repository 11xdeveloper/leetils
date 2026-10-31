/**
 * 3324. Find the Sequence of Strings Appeared on the Screen
 *
 * Type `target` with two keys: one appends "a", the other moves the last
 * letter one place on. Returns every string shown, in order, using the
 * fewest presses.
 *
 * For each letter, append "a" and step it up to the letter.
 *
 * @see https://leetcode.com/problems/find-the-sequence-of-strings-appeared-on-the-screen/
 * @difficulty Medium
 * @timeComplexity O(26 n²)
 * @spaceComplexity O(26 n²)
 *
 * @example
 * findTheSequenceOfStringsAppearedOnTheScreen("abc"); // ["a", "aa", "ab", "aba", "abb", "abc"]
 */
export const findTheSequenceOfStringsAppearedOnTheScreen = (
	target: string,
): string[] => {
	const screens: string[] = [];
	for (let i = 0; i < target.length; i++) {
		const typed = target.slice(0, i);
		for (let code = 97; code <= target.charCodeAt(i); code++)
			screens.push(typed + String.fromCharCode(code));
	}
	return screens;
};
