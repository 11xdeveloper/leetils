/**
 * 3425. Longest Special Path
 *
 * In a weighted tree rooted at 0, a special path goes downwards through
 * nodes with distinct values. Returns `[length, nodes]`: the longest total
 * weight, and the fewest nodes among paths that long.
 *
 * Depth-first search keeping the root-to-node path, its prefix weights and
 * each value's latest depth on it. A path ending at a node can't start
 * before the depth after the last repeat of any value, so carry that start
 * down and raise it when a node's value already sits on the path.
 * Zero-weight edges at the top add nodes but no length, so binary search the
 * prefix weights for the latest start giving the same length.
 *
 * @see https://leetcode.com/problems/longest-special-path/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSpecialPath([[0, 1, 2], [1, 2, 3], [1, 3, 5], [1, 4, 4], [2, 5, 6]], [2, 1, 2, 1, 3, 1]); // [6, 2]
 */
export const longestSpecialPath = (
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
	const lastDepth = new Map<number, number>();
	const prefix: number[] = [0];
	let bestLength = -1;
	let bestNodes = 0;
	// Each frame: node, parent, depth, window start, next neighbour, value's previous depth.
	const stack: [number, number, number, number, number, number | undefined][] =
		[];
	const enter = (
		node: number,
		parent: number,
		depth: number,
		start: number,
	): void => {
		const value = nums[node] ?? 0;
		const previous = lastDepth.get(value);
		const from = previous === undefined ? start : Math.max(start, previous + 1);
		lastDepth.set(value, depth);
		const length = (prefix[depth] ?? 0) - (prefix[from] ?? 0);
		// Zero-weight edges at the top add nodes but no length: start after them.
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
		stack.push([node, parent, depth, from, 0, previous]);
	};
	enter(0, -1, 0, 0);
	while (stack.length > 0) {
		const frame = stack.at(-1);
		if (!frame) break;
		const [node, parent, depth, from, next, previous] = frame;
		const edge = adjacent[node]?.[next];
		if (edge) {
			frame[4]++;
			const [child, weight] = edge;
			if (child === parent) continue;
			prefix[depth + 1] = (prefix[depth] ?? 0) + weight;
			enter(child, node, depth + 1, from);
			continue;
		}
		stack.pop();
		if (previous === undefined) lastDepth.delete(nums[node] ?? 0);
		else lastDepth.set(nums[node] ?? 0, previous);
	}
	return [bestLength, bestNodes];
};
