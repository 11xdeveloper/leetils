/**
 * 2140. Solving Questions With Brainpower
 *
 * Going through `questions[i] = [points, brainpower]` in order, solving
 * one earns its points but skips the next `brainpower` questions. Returns
 * the most points possible.
 *
 * `best[i]` is the most from question `i` on: skip it, or solve it and
 * continue from `i + brainpower + 1`.
 *
 * @see https://leetcode.com/problems/solving-questions-with-brainpower/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * solvingQuestionsWithBrainpower([[3, 2], [4, 3], [4, 4], [2, 5]]); // 5
 */
export const solvingQuestionsWithBrainpower = (
	questions: readonly (readonly number[])[],
): number => {
	const n = questions.length;
	const best = new Array<number>(n + 1).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		const [points = 0, brainpower = 0] = questions[i] ?? [];
		best[i] = Math.max(
			best[i + 1] ?? 0,
			points + (best[Math.min(n, i + brainpower + 1)] ?? 0),
		);
	}
	return best[0] ?? 0;
};
