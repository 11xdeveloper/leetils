/**
 * 3616. Number of Student Replacements
 *
 * Students arrive in order with `ranks` (lower is better). The first is
 * selected, and each later student with a strictly better rank than the
 * selected one replaces them. Counts the replacements.
 *
 * @see https://leetcode.com/problems/number-of-student-replacements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStudentReplacements([4, 1, 2]); // 1
 */
export const numberOfStudentReplacements = (
	ranks: readonly number[],
): number => {
	let selected = ranks[0] ?? 0;
	let replacements = 0;
	for (const rank of ranks)
		if (rank < selected) {
			selected = rank;
			replacements++;
		}
	return replacements;
};
