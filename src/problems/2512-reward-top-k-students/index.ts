/**
 * 2512. Reward Top K Students
 *
 * Each positive word in a student's report scores 3 points and each
 * negative word costs 1. Returns the ids of the `k` highest-scoring
 * students, breaking ties by smaller id.
 *
 * Score each report with word sets, then sort.
 *
 * @see https://leetcode.com/problems/reward-top-k-students/
 * @difficulty Medium
 * @timeComplexity O(total length + n log n)
 * @spaceComplexity O(total length)
 *
 * @example
 * rewardTopKStudents(["smart", "brilliant", "studious"], ["not"], ["this student is not studious", "the student is smart"], [1, 2], 2); // [2, 1]
 */
export const rewardTopKStudents = (
	positiveFeedback: readonly string[],
	negativeFeedback: readonly string[],
	report: readonly string[],
	studentId: readonly number[],
	k: number,
): number[] => {
	const positive = new Set(positiveFeedback);
	const negative = new Set(negativeFeedback);
	const scores = report.map((text) => {
		let score = 0;
		for (const word of text.split(" ")) {
			if (positive.has(word)) score += 3;
			else if (negative.has(word)) score--;
		}
		return score;
	});
	return studentId
		.map((id, i) => ({ id, score: scores[i] ?? 0 }))
		.sort((a, b) => b.score - a.score || a.id - b.id)
		.slice(0, k)
		.map(({ id }) => id);
};
