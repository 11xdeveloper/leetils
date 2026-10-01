/**
 * 1899. Merge Triplets to Form Target Triplet
 *
 * Merging two triplets replaces one with their element-wise maximum.
 * Returns whether some sequence of merges produces `target`.
 *
 * Only triplets with no value above the target's can ever be used; merging
 * all of them reaches the target exactly when each target value appears in
 * one of them.
 *
 * @see https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * mergeTripletsToFormTargetTriplet([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]); // true
 */
export const mergeTripletsToFormTargetTriplet = (
	triplets: readonly (readonly number[])[],
	target: readonly number[],
): boolean => {
	const found = [false, false, false];
	for (const triplet of triplets) {
		if (triplet.some((value, i) => value > (target[i] ?? 0))) continue;
		for (let i = 0; i < 3; i++) if (triplet[i] === target[i]) found[i] = true;
	}
	return found.every(Boolean);
};
