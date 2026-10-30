/**
 * 2545. Sort the Students by Their Kth Score
 *
 * Each row of `score` is a student's scores in each exam. Returns the
 * rows sorted by exam `k`, highest first.
 *
 * Sort a copy by column `k`.
 *
 * @see https://leetcode.com/problems/sort-the-students-by-their-kth-score/
 * @difficulty Medium
 * @timeComplexity O(m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * sortTheStudentsByTheirKthScore([[3, 4], [5, 6]], 0); // [[5, 6], [3, 4]]
 */
export const sortTheStudentsByTheirKthScore = (
	score: readonly (readonly number[])[],
	k: number,
): number[][] =>
	score.map((row) => [...row]).sort((a, b) => (b[k] ?? 0) - (a[k] ?? 0));
