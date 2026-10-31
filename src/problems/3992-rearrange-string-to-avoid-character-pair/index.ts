/**
 * 3992. Rearrange String to Avoid Character Pair
 *
 * Rearranges `s` so every `y` comes before every `x`: the y's first, then
 * the other letters, then the x's.
 *
 * @see https://leetcode.com/problems/rearrange-string-to-avoid-character-pair/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeStringToAvoidCharacterPair("aabc", "a", "c"); // "cbaa"
 */
export const rearrangeStringToAvoidCharacterPair = (
	s: string,
	x: string,
	y: string,
): string => {
	const letters = [...s];
	return [
		...letters.filter((c) => c === y),
		...letters.filter((c) => c !== x && c !== y),
		...letters.filter((c) => c === x),
	].join("");
};
