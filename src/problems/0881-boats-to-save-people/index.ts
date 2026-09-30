/**
 * 881. Boats to Save People
 *
 * Each boat carries at most two people with total weight at most `limit`
 * (everyone weighs at most `limit`). Returns the fewest boats needed.
 *
 * With the weights sorted, the heaviest person always boards, taking the
 * lightest remaining person along if they fit together.
 *
 * @see https://leetcode.com/problems/boats-to-save-people/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * boatsToSavePeople([3, 2, 2, 1], 3); // 3
 */
export const boatsToSavePeople = (
	people: readonly number[],
	limit: number,
): number => {
	const sorted = people.toSorted((a, b) => a - b);
	let boats = 0;
	for (let light = 0, heavy = sorted.length - 1; light <= heavy; heavy--) {
		if ((sorted[light] ?? 0) + (sorted[heavy] ?? 0) <= limit) light++;
		boats++;
	}
	return boats;
};
