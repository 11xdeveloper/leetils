/**
 * 3486. Longest Special Path II
 *
 * In a weighted tree rooted at 0, a special path goes downwards with at
 * most one value appearing twice and every other value once. Returns
 * `[length, nodes]`: the longest total weight, and the fewest nodes among
 * paths that long.
 *
 * Depth-first search keeping the root-to-node path, its prefix weights and
 * every value's depths on it. A path ending at a node must start after any
 * value's third-latest occurrence, and after the earlier of the two
 * latest repeats, so carry the start and the two largest repeat depths
 * down the tree. Zero-weight edges at the top add nodes but no length, so
 * binary search for the latest start of the same length.
 *
 * @see https://leetcode.com/problems/longest-special-path-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSpecialPathII([[0, 1, 1], [1, 2, 3], [1, 3, 1], [2, 4, 6], [4, 7, 2], [3, 5, 2], [3, 6, 5], [6, 8, 3]], [1, 1, 0, 3, 1, 2, 1, 1, 0]); // [9, 3]
 */
export const longestSpecialPathII = (
	edges: readonly (readonly number[])[],
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const adjacent: [next: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const depths = new Map<number, number[]>();
	const prefix: number[] = [0];
	let bestLength = -1;
	let bestNodes = 0;
	// Frame: node, parent, depth, start, top repeat, second repeat, next neighbour.
	const stack: [number, number, number, number, number, number, number][] = [];
	const enter = (
		node: number,
		parent: number,
		depth: number,
		start: number,
		top: number,
		second: number,
	): void => {
		const value = nums[node] ?? 0;
		const seen = depths.get(value) ?? [];
		let from = start;
		const previous2 = seen.at(-2);
		if (previous2 !== undefined) from = Math.max(from, previous2 + 1);
		let [r1, r2] = [top, second];
		const previous = seen.at(-1);
		if (previous !== undefined && previous >= from) {
			if (previous > r1) [r1, r2] = [previous, r1];
			else if (previous > r2) r2 = previous;
		}
		from = Math.max(from, r2 + 1);
		seen.push(depth);
		depths.set(value, seen);
		const length = (prefix[depth] ?? 0) - (prefix[from] ?? 0);
		let lo = from;
		let hi = depth;
		while (lo < hi) {
			const mid = Math.ceil((lo + hi) / 2);
			if ((prefix[mid] ?? 0) === (prefix[from] ?? 0)) lo = mid;
			else hi = mid - 1;
		}
		const nodes = depth - lo + 1;
		if (length > bestLength || (length === bestLength && nodes < bestNodes)) {
			bestLength = length;
			bestNodes = nodes;
		}
		stack.push([node, parent, depth, from, r1, r2, 0]);
	};
	enter(0, -1, 0, 0, -1, -1);
	while (stack.length > 0) {
		const frame = stack.at(-1);
		if (!frame) break;
		const [node, parent, depth, from, r1, r2, next] = frame;
		const edge = adjacent[node]?.[next];
		if (edge) {
			frame[6]++;
			const [child, weight] = edge;
			if (child === parent) continue;
			prefix[depth + 1] = (prefix[depth] ?? 0) + weight;
			enter(child, node, depth + 1, from, r1, r2);
			continue;
		}
		stack.pop();
		depths.get(nums[node] ?? 0)?.pop();
	}
	return [bestLength, bestNodes];
};
