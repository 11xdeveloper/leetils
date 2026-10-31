/**
 * 4050. Minimum Days to Score Exactly N Points
 *
 * A streak of L days scores 1 + 2 + … + L; a skipped day ends it. Returns
 * the fewest days, skips included, to score exactly `n`.
 *
 * Dynamic programming over scores: the last streak adds a triangular
 * number and its length, plus one skip day if something came before.
 *
 * @see https://leetcode.com/problems/minimum-days-to-score-exactly-n-points/
 * @difficulty Medium
 * @timeComplexity O(n √n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDaysToScoreExactlyNPoints(12); // 7
 */
export const minimumDaysToScoreExactlyNPoints = (n: number): number => {
	const best = new Float64Array(n + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (let score = 1; score <= n; score++)
		for (
			let length = 1, points = 1;
			points <= score;
			length++, points += length
		) {
			const rest = score - points;
			const days = (best[rest] ?? 0) + length + (rest > 0 ? 1 : 0);
			if (days < (best[score] ?? 0)) best[score] = days;
		}
	return best[n] ?? 0;
};
