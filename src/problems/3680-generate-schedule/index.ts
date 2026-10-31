/**
 * 3680. Generate Schedule
 *
 * `n` teams each play every other team twice, once at home and once away,
 * one match a day, and no team plays on two consecutive days. Returns
 * such a schedule as `[home, away]` pairs, or `[]` if none exists.
 *
 * With four or fewer teams it's impossible: any two matches share a team,
 * or (with four) only two disjoint pairs could ever alternate. Otherwise
 * build greedily, each day playing the allowed match whose teams have the
 * most matches left, which keeps the busiest teams from being stranded at
 * the end.
 *
 * @see https://leetcode.com/problems/generate-schedule/
 * @difficulty Medium
 * @timeComplexity O(n⁴)
 * @spaceComplexity O(n²)
 *
 * @example
 * generateSchedule(5).length; // 20
 */
export const generateSchedule = (n: number): number[][] => {
	if (n < 5) return [];
	const left = new Array<number>(n).fill(2 * (n - 1));
	const played = new Uint8Array(n * n);
	const schedule: number[][] = [];
	let [lastA, lastB] = [-1, -1];
	for (let day = 0; day < n * (n - 1); day++) {
		let [bestHome, bestAway, bestScore] = [-1, -1, -1];
		for (let home = 0; home < n; home++) {
			if (home === lastA || home === lastB) continue;
			for (let away = 0; away < n; away++) {
				if (
					away === home ||
					away === lastA ||
					away === lastB ||
					played[home * n + away]
				)
					continue;
				const score = (left[home] ?? 0) + (left[away] ?? 0);
				if (score > bestScore)
					[bestHome, bestAway, bestScore] = [home, away, score];
			}
		}
		if (bestHome < 0) return [];
		played[bestHome * n + bestAway] = 1;
		left[bestHome] = (left[bestHome] ?? 0) - 1;
		left[bestAway] = (left[bestAway] ?? 0) - 1;
		schedule.push([bestHome, bestAway]);
		[lastA, lastB] = [bestHome, bestAway];
	}
	return schedule;
};
