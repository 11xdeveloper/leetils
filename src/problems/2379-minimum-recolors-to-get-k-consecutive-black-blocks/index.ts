/**
 * 2379. Minimum Recolors to Get K Consecutive Black Blocks
 *
 * Returns the fewest white blocks "W" to recolour so some `k` consecutive
 * blocks are all black "B".
 *
 * Slide a window of `k` blocks, counting its whites.
 *
 * @see https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumRecolorsToGetKConsecutiveBlackBlocks("WBBWWBBWBW", 7); // 3
 */
export const minimumRecolorsToGetKConsecutiveBlackBlocks = (
	blocks: string,
	k: number,
): number => {
	let [whites, best] = [0, Infinity];
	for (let i = 0; i < blocks.length; i++) {
		if (blocks[i] === "W") whites++;
		if (i >= k && blocks[i - k] === "W") whites--;
		if (i >= k - 1) best = Math.min(best, whites);
	}
	return best;
};
