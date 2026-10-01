import { Heap } from "../../internal/heap";

/**
 * 1199. Minimum Time to Build Blocks
 *
 * Starting with one worker, each worker either builds one block (taking
 * `blocks[i]` time) or splits into two (taking `split` time). Returns the
 * least time to build every block.
 *
 * Works backwards like Huffman coding: the two quickest blocks are best
 * built by the two halves of one split, which acts like a single block
 * taking `split` plus the slower of the two. Merging with a min-heap until
 * one block is left gives the answer.
 *
 * @see https://leetcode.com/problems/minimum-time-to-build-blocks/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToBuildBlocks([1, 2, 3], 1); // 4
 */
export const minimumTimeToBuildBlocks = (
	blocks: readonly number[],
	split: number,
): number => {
	const heap = new Heap<number>((a, b) => a - b, blocks);
	while (heap.size > 1) {
		heap.pop();
		heap.push(split + (heap.pop() ?? 0));
	}
	return heap.peek() ?? 0;
};
