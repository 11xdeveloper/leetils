import { Heap } from "../../internal/heap";

/**
 * 2558. Take Gifts From the Richest Pile
 *
 * Each second for `k` seconds, the largest pile of gifts is cut down to
 * the floor of its square root. Returns the gifts left.
 *
 * Keep the piles in a max-heap.
 *
 * @see https://leetcode.com/problems/take-gifts-from-the-richest-pile/
 * @difficulty Easy
 * @timeComplexity O(n + k log n)
 * @spaceComplexity O(n)
 *
 * @example
 * takeGiftsFromTheRichestPile([25, 64, 9, 4, 100], 4); // 29
 */
export const takeGiftsFromTheRichestPile = (
	gifts: readonly number[],
	k: number,
): number => {
	const piles = new Heap<number>((a, b) => b - a, gifts);
	for (let i = 0; i < k; i++)
		piles.push(Math.floor(Math.sqrt(piles.pop() ?? 0)));
	let left = 0;
	for (let pile = piles.pop(); pile !== undefined; pile = piles.pop())
		left += pile;
	return left;
};
