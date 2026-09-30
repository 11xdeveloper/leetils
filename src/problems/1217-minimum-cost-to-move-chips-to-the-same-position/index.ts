/**
 * 1217. Minimum Cost to Move Chips to The Same Position
 *
 * Moving a chip 2 places is free and 1 place costs 1. Returns the least cost
 * to gather every chip in one position.
 *
 * Free moves take a chip anywhere of the same parity, so only chips that
 * change parity cost anything, 1 each. Gather on whichever parity has more
 * chips.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToMoveChipsToTheSamePosition([2, 2, 2, 3, 3]); // 2
 */
export const minimumCostToMoveChipsToTheSamePosition = (
	position: readonly number[],
): number => {
	const odd = position.filter((p) => p % 2 === 1).length;
	return Math.min(odd, position.length - odd);
};
