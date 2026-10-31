/**
 * 3229. Minimum Operations to Make Array Equal to Target
 *
 * The fewest operations, each adding or subtracting 1 across a whole
 * subarray, to turn `nums` into `target`.
 *
 * Work on the differences. Runs of same-signed differences can share
 * operations, so an element only needs new ones for the amount its
 * difference exceeds the previous one's (if they have the same sign), or
 * its whole difference otherwise.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-equal-to-target/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArrayEqualToTarget([3, 5, 1, 2], [4, 6, 2, 4]); // 2
 */
export const minimumOperationsToMakeArrayEqualToTarget = (
	nums: readonly number[],
	target: readonly number[],
): number => {
	let operations = 0;
	let previous = 0;
	nums.forEach((num, i) => {
		const diff = (target[i] ?? 0) - num;
		if (diff * previous > 0)
			operations += Math.max(0, Math.abs(diff) - Math.abs(previous));
		else operations += Math.abs(diff);
		previous = diff;
	});
	return operations;
};
