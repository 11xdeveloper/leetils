/**
 * 2391. Minimum Amount of Time to Collect Garbage
 *
 * Three trucks (metal, paper, glass) each drive along the houses from
 * house 0, as far as the last house with their kind of garbage; driving
 * between houses takes `travel[i]` and picking up a unit takes 1. Returns
 * the total time.
 *
 * Every unit costs 1, plus each truck's travel to its last house.
 *
 * @see https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAmountOfTimeToCollectGarbage(["G", "P", "GP", "GG"], [2, 4, 3]); // 21
 */
export const minimumAmountOfTimeToCollectGarbage = (
	garbage: readonly string[],
	travel: readonly number[],
): number => {
	const reach = [0];
	for (const t of travel) reach.push((reach.at(-1) ?? 0) + t);
	let time = 0;
	const last = new Map<string, number>();
	for (const [house, bags] of garbage.entries()) {
		time += bags.length;
		for (const kind of bags) last.set(kind, house);
	}
	for (const house of last.values()) time += reach[house] ?? 0;
	return time;
};
