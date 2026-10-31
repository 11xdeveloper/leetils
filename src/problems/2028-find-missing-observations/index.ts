/**
 * 2028. Find Missing Observations
 *
 * Of `m + n` six-sided dice rolls averaging `mean`, `rolls` are the `m`
 * known ones. Returns any `n` missing rolls that make the average work,
 * or `[]` if none do.
 *
 * The missing rolls must sum to `mean · (m + n)` minus the known sum,
 * which is possible between `n` and `6n`; spread it as evenly as possible.
 *
 * @see https://leetcode.com/problems/find-missing-observations/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMissingObservations([3, 2, 4, 3], 4, 2); // [6, 6]
 */
export const findMissingObservations = (
	rolls: readonly number[],
	mean: number,
	n: number,
): number[] => {
	const missing =
		mean * (rolls.length + n) - rolls.reduce((sum, v) => sum + v, 0);
	if (missing < n || missing > 6 * n) return [];
	const [base, extra] = [Math.floor(missing / n), missing % n];
	return Array.from({ length: n }, (_, i) => base + (i < extra ? 1 : 0));
};
