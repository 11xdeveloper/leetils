/**
 * 2677. Chunk Array
 *
 * Split `arr` into subarrays of `size` elements, the last one holding
 * whatever is left over.
 *
 * Slice off `size` elements at a time.
 *
 * @see https://leetcode.com/problems/chunk-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * chunkArray([1, 9, 6, 3, 2], 3); // [[1, 9, 6], [3, 2]]
 */
export function chunkArray<T>(arr: readonly T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += size)
		chunks.push(arr.slice(i, i + size));
	return chunks;
}
