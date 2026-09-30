/**
 * 1310. XOR Queries of a Subarray
 *
 * Returns, for each query `[left, right]`, the XOR of `arr[left … right]`.
 *
 * Prefix XORs: the range's XOR is the prefix up to `right` XOR the prefix
 * before `left`, since XORing a value twice cancels it.
 *
 * @see https://leetcode.com/problems/xor-queries-of-a-subarray/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * xorQueriesOfASubarray([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]]); // [2, 7, 14, 8]
 */
export const xorQueriesOfASubarray = (
	arr: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const prefix = new Array<number>(arr.length + 1).fill(0);
	arr.forEach((value, i) => {
		prefix[i + 1] = (prefix[i] ?? 0) ^ value;
	});
	return queries.map(
		([left = 0, right = 0]) => (prefix[right + 1] ?? 0) ^ (prefix[left] ?? 0),
	);
};
