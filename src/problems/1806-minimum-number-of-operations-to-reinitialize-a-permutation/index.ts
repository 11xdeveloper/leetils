/**
 * 1806. Minimum Number of Operations to Reinitialize a Permutation
 *
 * One operation maps the identity permutation of even length `n` through
 * `arr[i] = perm[i / 2]` for even `i` and `perm[n / 2 + (i − 1) / 2]` for
 * odd `i`. Returns how many operations return it to the identity.
 *
 * The operation is a fixed permutation of positions, and index 1 lies on
 * its longest cycle, so follow index 1 until it returns.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfOperationsToReinitializeAPermutation(6); // 4
 */
export const minimumNumberOfOperationsToReinitializeAPermutation = (
	n: number,
): number => {
	let [position, operations] = [1, 0];
	do {
		position = position % 2 === 0 ? position / 2 : n / 2 + (position - 1) / 2;
		operations++;
	} while (position !== 1);
	return operations;
};
