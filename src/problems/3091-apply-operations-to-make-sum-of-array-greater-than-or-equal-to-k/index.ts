/**
 * 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k
 *
 * Starting from `[1]`, each operation increases an element by 1 or appends
 * a copy of one. Returns the fewest operations to make the sum at least `k`.
 *
 * Increase first, then copy: raising the single element to v takes v - 1
 * operations and then ⌈k / v⌉ - 1 copies. Try every v up to √k and a bit
 * past it.
 *
 * @see https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(√k)
 * @spaceComplexity O(1)
 *
 * @example
 * applyOperationsToMakeSumOfArrayGreaterThanOrEqualToK(11); // 5
 */
export const applyOperationsToMakeSumOfArrayGreaterThanOrEqualToK = (
	k: number,
): number => {
	let best = k - 1;
	for (let v = 1; v * v <= 4 * k; v++)
		best = Math.min(best, v - 1 + Math.ceil(k / v) - 1);
	return best;
};
