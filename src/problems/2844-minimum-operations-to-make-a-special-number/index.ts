/**
 * 2844. Minimum Operations to Make a Special Number
 *
 * Each operation deletes one digit of `num`; deleting them all leaves 0.
 * Returns the fewest deletions that leave a multiple of 25.
 *
 * A multiple of 25 ends in 00, 25, 50 or 75. For each ending, find it as
 * far right as possible and delete everything after it; failing those, a
 * lone 0 or deleting everything works.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-a-special-number/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeASpecialNumber("2908305"); // 3
 */
export const minimumOperationsToMakeASpecialNumber = (num: string): number => {
	const n = num.length;
	let best = num.includes("0") ? n - 1 : n;
	for (const [first, last] of ["00", "25", "50", "75"]) {
		const end = num.lastIndexOf(last ?? "");
		if (end <= 0) continue;
		const start = num.lastIndexOf(first ?? "", end - 1);
		if (start >= 0) best = Math.min(best, n - start - 2);
	}
	return best;
};
