import { Heap } from "../../internal/heap";

/**
 * 218. The Skyline Problem
 *
 * Given buildings `[left, right, height]` sorted by `left`, returns the
 * skyline they form: the points `[x, height]` where the outline's height
 * changes, from left to right, ending with a point of height 0.
 *
 * Sweeps across every left and right edge. A max-heap holds the buildings
 * that have started, keyed by height; buildings that have ended are only
 * removed once they reach the top. The tallest building still standing sets
 * the height at each edge, and a key point is added whenever it changes.
 *
 * @see https://leetcode.com/problems/the-skyline-problem/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * theSkylineProblem([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]);
 * // [[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]]
 */
export const theSkylineProblem = (
	buildings: readonly (readonly number[])[],
): number[][] => {
	const edges = [
		...new Set(buildings.flatMap(([left = 0, right = 0]) => [left, right])),
	].sort((a, b) => a - b);
	const standing = new Heap<[height: number, right: number]>(
		(a, b) => b[0] - a[0],
	);
	const skyline: number[][] = [];
	let next = 0;

	for (const x of edges) {
		while (next < buildings.length && (buildings[next]?.[0] ?? 0) <= x) {
			const [, right = 0, height = 0] = buildings[next] ?? [];
			standing.push([height, right]);
			next++;
		}
		while ((standing.peek()?.[1] ?? Number.POSITIVE_INFINITY) <= x)
			standing.pop();

		const height = standing.peek()?.[0] ?? 0;
		if (skyline.at(-1)?.[1] !== height) skyline.push([x, height]);
	}

	return skyline;
};
