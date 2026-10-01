/**
 * 983. Minimum Cost For Tickets
 *
 * Covers the travel `days` (increasing, 1 to 365) with 1-day, 7-day and
 * 30-day passes costing `costs[0]`, `costs[1]` and `costs[2]`. Returns the
 * least total cost.
 *
 * `best[d]` is the least cost covering the travel days up to `d`. A non-
 * travel day costs nothing extra; a travel day ends some pass bought 1, 7
 * or 30 days earlier.
 *
 * @see https://leetcode.com/problems/minimum-cost-for-tickets/
 * @difficulty Medium
 * @timeComplexity O(last day)
 * @spaceComplexity O(last day)
 *
 * @example
 * minimumCostForTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]); // 11
 */
export const minimumCostForTickets = (
	days: readonly number[],
	costs: readonly number[],
): number => {
	const last = days.at(-1) ?? 0;
	const travel = new Set(days);
	const best = new Array<number>(last + 1).fill(0);
	const [day1 = 0, day7 = 0, day30 = 0] = costs;
	for (let d = 1; d <= last; d++) {
		if (!travel.has(d)) {
			best[d] = best[d - 1] ?? 0;
			continue;
		}
		best[d] = Math.min(
			(best[d - 1] ?? 0) + day1,
			(best[Math.max(0, d - 7)] ?? 0) + day7,
			(best[Math.max(0, d - 30)] ?? 0) + day30,
		);
	}
	return best[last] ?? 0;
};
