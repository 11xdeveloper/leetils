/**
 * 1921. Eliminate Maximum Number of Monsters
 *
 * Monsters approach from `dist` at `speed`; a weapon kills one per minute
 * (from minute 0) and you lose when one arrives. Returns how many are
 * killed.
 *
 * Kill them in order of arrival minute `⌈dist / speed⌉`; the `i`-th kill
 * happens at minute `i`, too late once a monster arrives by then.
 *
 * @see https://leetcode.com/problems/eliminate-maximum-number-of-monsters/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * eliminateMaximumNumberOfMonsters([1, 3, 4], [1, 1, 1]); // 3
 */
export const eliminateMaximumNumberOfMonsters = (
	dist: readonly number[],
	speed: readonly number[],
): number => {
	const arrivals = dist
		.map((d, i) => Math.ceil(d / (speed[i] ?? 1)))
		.sort((a, b) => a - b);
	for (const [minute, arrival] of arrivals.entries())
		if (arrival <= minute) return minute;
	return arrivals.length;
};
