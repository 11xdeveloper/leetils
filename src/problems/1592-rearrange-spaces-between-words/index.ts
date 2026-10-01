/**
 * 1592. Rearrange Spaces Between Words
 *
 * Spreads the spaces of `text` evenly between its words, as many as fit
 * equally, and puts any left over at the end.
 *
 * Counts spaces and words, then rebuilds the string.
 *
 * @see https://leetcode.com/problems/rearrange-spaces-between-words/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeSpacesBetweenWords(" practice   makes   perfect"); // "practice   makes   perfect "
 */
export const rearrangeSpacesBetweenWords = (text: string): string => {
	const words = text.split(" ").filter((word) => word !== "");
	const spaces = text.length - words.join("").length;
	const gap = words.length > 1 ? Math.floor(spaces / (words.length - 1)) : 0;
	const joined = words.join(" ".repeat(gap));
	return joined + " ".repeat(text.length - joined.length);
};
