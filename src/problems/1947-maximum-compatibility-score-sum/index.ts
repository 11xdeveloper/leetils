/**
 * 1947. Maximum Compatibility Score Sum
 *
 * Pairs each student with a distinct mentor; a pair scores the number of
 * answers they share. Returns the largest total score.
 *
 * Bitmask dynamic programming over the mentors already taken, assigning
 * students in order (at most 8 of each).
 *
 * @see https://leetcode.com/problems/maximum-compatibility-score-sum/
 * @difficulty Medium
 * @timeComplexity O(2^m · m · n)
 * @spaceComplexity O(2^m)
 *
 * @example
 * maximumCompatibilityScoreSum([[1, 1, 0], [1, 0, 1], [0, 0, 1]], [[1, 0, 0], [0, 0, 1], [1, 1, 0]]); // 8
 */
export const maximumCompatibilityScoreSum = (
	students: readonly (readonly number[])[],
	mentors: readonly (readonly number[])[],
): number => {
	const m = students.length;
	const score = students.map((student) =>
		mentors.map(
			(mentor) => student.filter((answer, i) => answer === mentor[i]).length,
		),
	);
	const best = new Array<number>(1 << m).fill(-1);
	best[0] = 0;
	for (let mask = 0; mask < (1 << m) - 1; mask++) {
		const current = best[mask] ?? -1;
		if (current < 0) continue;
		let student = 0;
		for (let bits = mask; bits > 0; bits &= bits - 1) student++;
		for (let mentor = 0; mentor < m; mentor++) {
			if (mask & (1 << mentor)) continue;
			const next = mask | (1 << mentor);
			best[next] = Math.max(
				best[next] ?? -1,
				current + (score[student]?.[mentor] ?? 0),
			);
		}
	}
	return best[(1 << m) - 1] ?? 0;
};
