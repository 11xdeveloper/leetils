/**
 * 3499. Maximize Active Section with Trade I
 *
 * In the binary string `s` (padded with a 1 at each end), one trade turns
 * a block of 1s with 0s on both sides into 0s, then a block of 0s with 1s
 * on both sides into 1s. Returns the most 1s possible in `s` after at most
 * one trade.
 *
 * The best trade dissolves a block of 1s between two blocks of 0s and then
 * fills the merged block, gaining both zero blocks. So add the largest sum
 * of two neighbouring zero blocks to the 1s.
 *
 * @see https://leetcode.com/problems/maximize-active-section-with-trade-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeActiveSectionWithTradeI("0100"); // 4
 */
export const maximizeActiveSectionWithTradeI = (s: string): number => {
	const ones = [...s].filter((c) => c === "1").length;
	const zeros = s
		.split("1")
		.filter((block) => block.length > 0)
		.map((block) => block.length);
	let best = 0;
	for (let i = 1; i < zeros.length; i++)
		best = Math.max(best, (zeros[i - 1] ?? 0) + (zeros[i] ?? 0));
	return ones + best;
};
