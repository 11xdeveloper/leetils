/**
 * 888. Fair Candy Swap
 *
 * Alice's and Bob's candy boxes hold different totals. Returns one box
 * size each could swap, `[alice's, bob's]`, so they end up with equal
 * totals; an answer is guaranteed.
 *
 * Swapping `x` for `y` changes Alice's total by `y - x`, which must be half
 * the difference, so for each of Alice's boxes it looks up the matching
 * box of Bob's in a set.
 *
 * @see https://leetcode.com/problems/fair-candy-swap/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(m)
 *
 * @example
 * fairCandySwap([1, 2], [2, 3]); // [1, 2]
 */
export const fairCandySwap = (
	aliceSizes: readonly number[],
	bobSizes: readonly number[],
): number[] => {
	const sum = (sizes: readonly number[]) =>
		sizes.reduce((total, size) => total + size, 0);
	const delta = (sum(bobSizes) - sum(aliceSizes)) / 2;
	const bob = new Set(bobSizes);
	for (const x of aliceSizes) if (bob.has(x + delta)) return [x, x + delta];
	return [];
};
