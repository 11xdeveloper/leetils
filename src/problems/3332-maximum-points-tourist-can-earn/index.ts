/**
 * 3332. Maximum Points Tourist Can Earn
 *
 * A tourist spends `k` days among `n` cities, starting anywhere. Each day
 * they stay (earning `stayScore[day][city]`) or move (earning
 * `travelScore[from][to]`). Returns the most points possible.
 *
 * Track the best total for ending each day in each city.
 *
 * @see https://leetcode.com/problems/maximum-points-tourist-can-earn/
 * @difficulty Medium
 * @timeComplexity O(k · n²)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPointsTouristCanEarn(2, 1, [[2, 3]], [[0, 2], [1, 0]]); // 3
 */
export const maximumPointsTouristCanEarn = (
	n: number,
	k: number,
	stayScore: readonly (readonly number[])[],
	travelScore: readonly (readonly number[])[],
): number => {
	let best = new Array<number>(n).fill(0);
	for (let day = 0; day < k; day++)
		best = best.map((_, city) => {
			let value = (best[city] ?? 0) + (stayScore[day]?.[city] ?? 0);
			for (let from = 0; from < n; from++)
				if (from !== city)
					value = Math.max(
						value,
						(best[from] ?? 0) + (travelScore[from]?.[city] ?? 0),
					);
			return value;
		});
	return Math.max(...best);
};
