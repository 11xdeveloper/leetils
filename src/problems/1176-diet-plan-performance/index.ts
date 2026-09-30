/**
 * 1176. Diet Plan Performance
 *
 * For every window of `k` consecutive days, the dieter loses a point if they
 * ate fewer than `lower` calories in total and gains one if they ate more
 * than `upper`. Returns their final score.
 *
 * Slides a window of `k` days along `calories`, updating its total as it
 * goes.
 *
 * @see https://leetcode.com/problems/diet-plan-performance/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * dietPlanPerformance([6, 5, 0, 0], 2, 1, 5); // 0
 */
export const dietPlanPerformance = (
	calories: readonly number[],
	k: number,
	lower: number,
	upper: number,
): number => {
	let [total, points] = [0, 0];
	calories.forEach((eaten, i) => {
		total += eaten - (calories[i - k] ?? 0);
		if (i < k - 1) return;
		if (total < lower) points--;
		else if (total > upper) points++;
	});
	return points;
};
