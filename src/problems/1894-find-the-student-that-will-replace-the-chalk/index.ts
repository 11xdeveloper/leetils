/**
 * 1894. Find the Student that Will Replace the Chalk
 *
 * Students take turns in a circle, student `i` using `chalk[i]` pieces.
 * Returns the first student who finds fewer than they need, starting with
 * `k` pieces.
 *
 * Skip whole rounds with `k mod (total chalk)`, then walk one round.
 *
 * @see https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheStudentThatWillReplaceTheChalk([3, 4, 1, 2], 25); // 1
 */
export const findTheStudentThatWillReplaceTheChalk = (
	chalk: readonly number[],
	k: number,
): number => {
	let left = k % chalk.reduce((sum, pieces) => sum + pieces, 0);
	for (const [i, pieces] of chalk.entries()) {
		if (left < pieces) return i;
		left -= pieces;
	}
	return 0;
};
