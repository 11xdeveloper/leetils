/**
 * 3784. Minimum Deletion Cost to Make All Characters Equal
 *
 * Deleting `s[i]` costs `cost[i]`. Returns the cheapest way to leave only
 * one kind of letter: keep the letter whose copies cost the most.
 *
 * @see https://leetcode.com/problems/minimum-deletion-cost-to-make-all-characters-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionCostToMakeAllCharactersEqual("aabaac", [1, 2, 3, 4, 1, 10]); // 11
 */
export const minimumDeletionCostToMakeAllCharactersEqual = (
	s: string,
	cost: readonly number[],
): number => {
	const byLetter = new Map<string, number>();
	let total = 0;
	[...s].forEach((c, i) => {
		byLetter.set(c, (byLetter.get(c) ?? 0) + (cost[i] ?? 0));
		total += cost[i] ?? 0;
	});
	return total - Math.max(...byLetter.values());
};
