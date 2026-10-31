/**
 * 2712. Minimum Cost to Make All Characters Equal
 *
 * Inverting the prefix ending at `i` costs `i + 1`, and the suffix
 * starting at `i` costs `n - i`. Returns the cheapest way to make the
 * binary string uniform.
 *
 * Each boundary between unequal neighbours needs one flip on one side,
 * and flips at different boundaries don't interfere, so take the cheaper
 * side at each.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToMakeAllCharactersEqual("010101"); // 9
 */
export const minimumCostToMakeAllCharactersEqual = (s: string): number => {
	let cost = 0;
	for (let i = 1; i < s.length; i++)
		if (s.charAt(i) !== s.charAt(i - 1)) cost += Math.min(i, s.length - i);
	return cost;
};
