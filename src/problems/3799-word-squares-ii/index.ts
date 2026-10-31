/**
 * 3799. Word Squares II
 *
 * From distinct 4-letter `words`, find every choice of four different
 * words top, left, right and bottom whose corners agree: top and left
 * start alike, top ends as right starts, bottom starts as left ends, and
 * bottom and right end alike. Returns them as [top, left, right, bottom],
 * sorted.
 *
 * With at most 15 words, try every ordered choice in sorted order.
 *
 * @see https://leetcode.com/problems/word-squares-ii/
 * @difficulty Medium
 * @timeComplexity O(n⁴)
 * @spaceComplexity O(n⁴)
 *
 * @example
 * wordSquaresII(["able", "area", "echo", "also"]); // [["able", "area", "echo", "also"], ["area", "able", "also", "echo"]]
 */
export const wordSquaresII = (words: readonly string[]): string[][] => {
	const sorted = [...words].sort();
	const squares: string[][] = [];
	for (const top of sorted)
		for (const left of sorted) {
			if (left === top || left[0] !== top[0]) continue;
			for (const right of sorted) {
				if (right === top || right === left || right[0] !== top[3]) continue;
				for (const bottom of sorted) {
					if (bottom === top || bottom === left || bottom === right) continue;
					if (bottom[0] === left[3] && bottom[3] === right[3])
						squares.push([top, left, right, bottom]);
				}
			}
		}
	return squares;
};
