/**
 * 2896. Apply Operations to Make Two Strings Equal
 *
 * To turn binary string `s1` into `s2`, you may flip any two bits for
 * cost `x`, or two adjacent bits for cost 1. Returns the cheapest way, or
 * -1 if impossible.
 *
 * Only the positions that differ matter, and there must be an even
 * number. Pair them up: a far pair costs `x`, which is `x / 2` per
 * position, and neighbouring mismatches can instead be fixed by a chain
 * of adjacent flips costing their distance. DP over the mismatches with
 * costs doubled to stay whole.
 *
 * @see https://leetcode.com/problems/apply-operations-to-make-two-strings-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToMakeTwoStringsEqual("1100011000", "0101001010", 2); // 4
 */
export const applyOperationsToMakeTwoStringsEqual = (
	s1: string,
	s2: string,
	x: number,
): number => {
	const diff: number[] = [];
	for (let i = 0; i < s1.length; i++)
		if (s1.charAt(i) !== s2.charAt(i)) diff.push(i);
	if (diff.length % 2 === 1) return -1;
	// twice[i]: twice the cheapest cost to fix the first i mismatches.
	const twice = [0];
	for (let i = 1; i <= diff.length; i++) {
		let best = (twice[i - 1] ?? 0) + x;
		if (i >= 2)
			best = Math.min(
				best,
				(twice[i - 2] ?? 0) + 2 * ((diff[i - 1] ?? 0) - (diff[i - 2] ?? 0)),
			);
		twice.push(best);
	}
	return (twice[diff.length] ?? 0) / 2;
};
