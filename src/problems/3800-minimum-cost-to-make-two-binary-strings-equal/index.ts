/**
 * 3800. Minimum Cost to Make Two Binary Strings Equal
 *
 * Make `s` and `t` equal by flipping a bit of either (`flipCost`),
 * swapping two bits within one string (`swapCost`) or swapping `s[i]`
 * with `t[i]` (`crossCost`). Returns the least total cost.
 *
 * Only mismatched positions matter, of two kinds: s has 0 and t has 1, or
 * the reverse. One of each kind is fixed by one swap within s; two of the
 * same kind by a cross swap (turning one into the other kind) and a
 * swap; anything else by flips.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-two-binary-strings-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToMakeTwoBinaryStringsEqual("01000", "10111", 10, 2, 2); // 16
 */
export const minimumCostToMakeTwoBinaryStringsEqual = (
	s: string,
	t: string,
	flipCost: number,
	swapCost: number,
	crossCost: number,
): number => {
	let [zeroOne, oneZero] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "0" && t[i] === "1") zeroOne++;
		else if (s[i] === "1" && t[i] === "0") oneZero++;
	}
	const mixed = Math.min(zeroOne, oneZero);
	const rest = Math.abs(zeroOne - oneZero);
	return (
		mixed * Math.min(swapCost, 2 * flipCost) +
		Math.floor(rest / 2) * Math.min(2 * flipCost, crossCost + swapCost) +
		(rest % 2) * flipCost
	);
};
