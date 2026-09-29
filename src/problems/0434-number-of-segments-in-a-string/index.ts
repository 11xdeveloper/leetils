/**
 * 434. Number of Segments in a String
 *
 * Returns how many segments `s` has: maximal runs of characters other than
 * spaces.
 *
 * Counts each non-space character that starts a segment: the first
 * character, or one right after a space.
 *
 * @see https://leetcode.com/problems/number-of-segments-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSegmentsInAString("Hello, my name is John"); // 5
 */
export const numberOfSegmentsInAString = (s: string): number => {
	let segments = 0;
	for (let i = 0; i < s.length; i++) {
		if (s[i] !== " " && (i === 0 || s[i - 1] === " ")) segments++;
	}
	return segments;
};
