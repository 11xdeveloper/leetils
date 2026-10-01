import { Heap } from "../../internal/heap";

/**
 * 1642. Furthest Building You Can Reach
 *
 * Moving right along `heights`, each climb takes a ladder or as many bricks
 * as its height. Returns the furthest index reachable.
 *
 * Ladders are best spent on the largest climbs, so keep the climbs that
 * use ladders in a min-heap. Once there are more climbs than ladders, the
 * smallest of them is paid for with bricks instead; stop when bricks run
 * out.
 *
 * @see https://leetcode.com/problems/furthest-building-you-can-reach/
 * @difficulty Medium
 * @timeComplexity O(n log l) for l ladders
 * @spaceComplexity O(l)
 *
 * @example
 * furthestBuildingYouCanReach([4, 2, 7, 6, 9, 14, 12], 5, 1); // 4
 */
export const furthestBuildingYouCanReach = (
	heights: readonly number[],
	bricks: number,
	ladders: number,
): number => {
	const laddered = new Heap<number>((a, b) => a - b);
	let left = bricks;
	for (let i = 1; i < heights.length; i++) {
		const climb = (heights[i] ?? 0) - (heights[i - 1] ?? 0);
		if (climb <= 0) continue;
		laddered.push(climb);
		if (laddered.size <= ladders) continue;
		left -= laddered.pop() ?? 0;
		if (left < 0) return i - 1;
	}
	return heights.length - 1;
};
