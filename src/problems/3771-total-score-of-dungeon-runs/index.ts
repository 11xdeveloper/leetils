/**
 * 3771. Total Score of Dungeon Runs
 *
 * A run starts at some room with `hp` and walks through the rest; each
 * room deals its `damage`, then scores a point if the remaining hp is at
 * least its `requirement`. Returns the total points over runs from every
 * starting room.
 *
 * With damage prefix sums D, room j scores for a start i when
 * D[i] ≥ D[j + 1] + `requirement[j]` - hp. D increases, so the scoring
 * starts are a range found by binary search.
 *
 * @see https://leetcode.com/problems/total-score-of-dungeon-runs/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * totalScoreOfDungeonRuns(11, [3, 6, 7], [4, 2, 5]); // 3
 */
export const totalScoreOfDungeonRuns = (
	hp: number,
	damage: readonly number[],
	requirement: readonly number[],
): number => {
	const prefix = [0];
	for (const d of damage) prefix.push((prefix.at(-1) ?? 0) + d);
	let total = 0;
	requirement.forEach((need, j) => {
		const threshold = (prefix[j + 1] ?? 0) + need - hp;
		let [lo, hi] = [0, j + 1];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((prefix[mid] ?? 0) >= threshold) hi = mid;
			else lo = mid + 1;
		}
		total += j + 1 - lo;
	});
	return total;
};
