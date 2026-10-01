/**
 * 1318. Minimum Flips to Make a OR b Equal to c
 *
 * Returns the fewest bit flips in `a` and `b` so that `a | b` equals `c`.
 *
 * Bit by bit: where `c` has a 1, one flip is needed if both `a` and `b`
 * have 0; where `c` has a 0, every 1 in `a` or `b` must be flipped.
 *
 * @see https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/
 * @difficulty Medium
 * @timeComplexity O(log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumFlipsToMakeAOrBEqualToC(2, 6, 5); // 3
 */
export const minimumFlipsToMakeAOrBEqualToC = (
	a: number,
	b: number,
	c: number,
): number => {
	let flips = 0;
	for (let bit = 0; bit < 31; bit++) {
		const [x, y, z] = [(a >> bit) & 1, (b >> bit) & 1, (c >> bit) & 1];
		flips += z === 1 ? 1 - (x | y) : x + y;
	}
	return flips;
};
