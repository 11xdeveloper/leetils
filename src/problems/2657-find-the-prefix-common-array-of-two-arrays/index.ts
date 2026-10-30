/**
 * 2657. Find the Prefix Common Array of Two Arrays
 *
 * For two permutations `A` and `B`, returns how many numbers appear in
 * both `A[0..i]` and `B[0..i]`, for each `i`.
 *
 * Count how many times each number has been seen across both prefixes;
 * it becomes common on its second sighting.
 *
 * @see https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findThePrefixCommonArrayOfTwoArrays([1, 3, 2, 4], [3, 1, 2, 4]); // [0, 2, 3, 4]
 */
export const findThePrefixCommonArrayOfTwoArrays = (
	A: readonly number[],
	B: readonly number[],
): number[] => {
	const seen = new Uint8Array(A.length + 1);
	let common = 0;
	return A.map((a, i) => {
		for (const x of [a, B[i] ?? 0]) {
			seen[x] = (seen[x] ?? 0) + 1;
			if (seen[x] === 2) common++;
		}
		return common;
	});
};
