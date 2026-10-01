/**
 * 1854. Maximum Population Year
 *
 * Each log `[birth, death]` counts a person alive in years
 * `birth … death − 1` (all within 1950–2050). Returns the earliest year
 * with the most people alive.
 *
 * A difference array over the years, then a running sum.
 *
 * @see https://leetcode.com/problems/maximum-population-year/
 * @difficulty Easy
 * @timeComplexity O(n + 101)
 * @spaceComplexity O(101)
 *
 * @example
 * maximumPopulationYear([[1950, 1961], [1960, 1971], [1970, 1981]]); // 1960
 */
export const maximumPopulationYear = (
	logs: readonly (readonly number[])[],
): number => {
	const change = new Array<number>(102).fill(0);
	for (const [birth = 1950, death = 1950] of logs) {
		change[birth - 1950] = (change[birth - 1950] ?? 0) + 1;
		change[death - 1950] = (change[death - 1950] ?? 0) - 1;
	}
	let [alive, best, year] = [0, 0, 1950];
	for (let offset = 0; offset <= 100; offset++) {
		alive += change[offset] ?? 0;
		if (alive > best) [best, year] = [alive, 1950 + offset];
	}
	return year;
};
