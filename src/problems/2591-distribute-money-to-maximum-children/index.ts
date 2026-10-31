/**
 * 2591. Distribute Money to Maximum Children
 *
 * Hands out all of `money` dollars to `children` so each child gets at
 * least 1 and none gets exactly 4. Returns the most children who can get
 * exactly 8, or -1 if no valid distribution exists.
 *
 * Give everyone 1, then top up as many as possible with 7 more. Leftover
 * money must go somewhere: if everyone already has 8 it spoils one of
 * them, and if exactly one child is left with 1 and the leftover is 3,
 * they'd get 4, which also costs one.
 *
 * @see https://leetcode.com/problems/distribute-money-to-maximum-children/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * distributeMoneyToMaximumChildren(20, 3); // 1
 */
export const distributeMoneyToMaximumChildren = (
	money: number,
	children: number,
): number => {
	if (money < children) return -1;
	const spare = money - children;
	const eights = Math.min(Math.floor(spare / 7), children);
	const leftover = spare - 7 * eights;
	if (eights === children && leftover > 0) return eights - 1;
	if (eights === children - 1 && leftover === 3) return eights - 1;
	return eights;
};
