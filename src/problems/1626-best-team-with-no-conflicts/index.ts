/**
 * 1626. Best Team With No Conflicts
 *
 * Returns the largest total score of a team in which no younger player
 * scores strictly more than an older one.
 *
 * Sorted by age and then score, a valid team is a subsequence with
 * non-decreasing scores, so find the heaviest such subsequence with the
 * quadratic longest-increasing-subsequence recurrence.
 *
 * @see https://leetcode.com/problems/best-team-with-no-conflicts/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * bestTeamWithNoConflicts([4, 5, 6, 5], [2, 1, 2, 1]); // 16
 */
export const bestTeamWithNoConflicts = (
	scores: readonly number[],
	ages: readonly number[],
): number => {
	const players = scores
		.map((score, i) => [ages[i] ?? 0, score] as const)
		.sort(([ageA, scoreA], [ageB, scoreB]) => ageA - ageB || scoreA - scoreB);
	const best: number[] = [];
	for (const [i, [, score]] of players.entries()) {
		let total = score;
		for (let j = 0; j < i; j++) {
			if ((players[j]?.[1] ?? 0) <= score)
				total = Math.max(total, (best[j] ?? 0) + score);
		}
		best.push(total);
	}
	return Math.max(...best);
};
