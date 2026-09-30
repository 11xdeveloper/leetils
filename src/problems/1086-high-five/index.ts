/**
 * 1086. High Five
 *
 * Each item is `[id, score]`. Returns `[id, average]` for every student,
 * sorted by id, where the average is the integer mean of their top five
 * scores. Every student has at least five.
 *
 * Groups the scores by student, then sorts each student's scores and
 * averages the top five.
 *
 * @see https://leetcode.com/problems/high-five/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * highFive([[1, 91], [1, 92], [2, 93], [2, 97], [1, 60], [2, 77], [1, 65], [1, 87], [1, 100], [2, 100], [2, 76]]); // [[1, 87], [2, 88]]
 */
export const highFive = (items: readonly (readonly number[])[]): number[][] => {
	const scores = new Map<number, number[]>();
	for (const [id = 0, score = 0] of items) {
		const list = scores.get(id);
		if (list) list.push(score);
		else scores.set(id, [score]);
	}
	return [...scores]
		.sort((a, b) => a[0] - b[0])
		.map(([id, list]) => [
			id,
			Math.floor(
				list
					.sort((a, b) => b - a)
					.slice(0, 5)
					.reduce((sum, score) => sum + score, 0) / 5,
			),
		]);
};
