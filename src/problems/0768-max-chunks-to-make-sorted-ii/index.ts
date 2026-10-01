/**
 * 768. Max Chunks To Make Sorted II
 *
 * Returns the most pieces `arr` can be cut into so that sorting each piece
 * on its own and joining them gives the sorted array. Values may repeat.
 *
 * Keeps a stack of each chunk's maximum. A new value smaller than the last
 * chunk's maximum must join it, and that merged chunk also swallows every
 * earlier chunk whose maximum exceeds the value. The stack's size at the
 * end is the answer.
 *
 * @see https://leetcode.com/problems/max-chunks-to-make-sorted-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maxChunksToMakeSortedII([2, 1, 3, 4, 4]); // 4: [2, 1], [3], [4], [4]
 */
export const maxChunksToMakeSortedII = (arr: readonly number[]): number => {
	const maxima: number[] = [];
	for (const value of arr) {
		let max = value;
		while (maxima.length > 0 && (maxima.at(-1) ?? 0) > value)
			max = Math.max(max, maxima.pop() ?? 0);
		maxima.push(max);
	}
	return maxima.length;
};
