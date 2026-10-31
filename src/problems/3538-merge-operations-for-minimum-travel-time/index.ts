/**
 * 3538. Merge Operations for Minimum Travel Time
 *
 * Signs at `position` split a road into segments, the one starting at sign
 * i taking `time[i]` per unit. Exactly `k` times, remove an interior sign,
 * adding its time to the next sign's. Returns the least total travel time.
 *
 * A kept sign's time is its own plus that of the removed signs just before
 * it. Dynamic programming over (current kept sign, previous kept sign,
 * removals so far), stepping to the next kept sign and paying for the
 * segment at the current sign's merged time.
 *
 * @see https://leetcode.com/problems/merge-operations-for-minimum-travel-time/
 * @difficulty Hard
 * @timeComplexity O(n³ · k)
 * @spaceComplexity O(n² · k)
 *
 * @example
 * mergeOperationsForMinimumTravelTime(10, 4, 1, [0, 3, 8, 10], [5, 8, 3, 6]); // 62
 */
export const mergeOperationsForMinimumTravelTime = (
	_l: number,
	n: number,
	k: number,
	position: readonly number[],
	time: readonly number[],
): number => {
	const prefix = [0];
	for (const t of time) prefix.push((prefix.at(-1) ?? 0) + t);
	const INF = Number.POSITIVE_INFINITY;
	// best[(at * n + before) * (k + 1) + removed]: cost so far with `at` kept after `before`.
	const best = new Float64Array(n * n * (k + 1)).fill(INF);
	const index = (at: number, before: number, removed: number): number =>
		(at * n + before) * (k + 1) + removed;
	best[index(0, 0, 0)] = 0;
	let answer = INF;
	for (let at = 0; at < n; at++)
		for (let before = 0; before <= at; before++)
			for (let removed = 0; removed <= k; removed++) {
				const cost = best[index(at, before, removed)] ?? INF;
				if (cost === INF) continue;
				if (at === n - 1) {
					if (removed === k) answer = Math.min(answer, cost);
					continue;
				}
				const merged =
					(prefix[at + 1] ?? 0) - (prefix[at === 0 ? 0 : before + 1] ?? 0);
				for (
					let next = at + 1;
					next < n && removed + (next - at - 1) <= k;
					next++
				) {
					const total =
						cost + ((position[next] ?? 0) - (position[at] ?? 0)) * merged;
					const slot = index(next, at, removed + next - at - 1);
					if (total < (best[slot] ?? INF)) best[slot] = total;
				}
			}
	return answer;
};
