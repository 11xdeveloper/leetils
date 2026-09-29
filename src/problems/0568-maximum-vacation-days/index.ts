/**
 * 568. Maximum Vacation Days
 *
 * Starting in city 0, you spend `k` weeks among `n` cities, and can take a
 * flight each Monday morning along `flights[i][j] = 1` (or stay put). Week
 * `w` in city `i` allows `days[i][w]` vacation days. Returns the most
 * vacation days you can take.
 *
 * DP over weeks: the most vacation days that end each week in each city,
 * taking the best over every city you could have flown in from (or stayed
 * in). Cities you can't have reached stay unreachable.
 *
 * @see https://leetcode.com/problems/maximum-vacation-days/
 * @difficulty Hard
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumVacationDays([[0, 1, 1], [1, 0, 1], [1, 1, 0]], [[1, 3, 1], [6, 0, 3], [3, 3, 3]]); // 12
 */
export const maximumVacationDays = (
	flights: readonly (readonly number[])[],
	days: readonly (readonly number[])[],
): number => {
	const n = flights.length;
	const weeks = days[0]?.length ?? 0;
	// best[city] is the most vacation days so far ending in city, or -Infinity if it can't be reached.
	let best = Array.from({ length: n }, (_, city) =>
		city === 0 ? 0 : Number.NEGATIVE_INFINITY,
	);

	for (let week = 0; week < weeks; week++) {
		const next = new Array<number>(n).fill(Number.NEGATIVE_INFINITY);
		for (let to = 0; to < n; to++) {
			for (let from = 0; from < n; from++) {
				if (from === to || flights[from]?.[to] === 1) {
					next[to] = Math.max(
						next[to] ?? 0,
						(best[from] ?? 0) + (days[to]?.[week] ?? 0),
					);
				}
			}
		}
		best = next;
	}

	return Math.max(...best);
};
