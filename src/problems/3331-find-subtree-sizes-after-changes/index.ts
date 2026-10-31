/**
 * 3331. Find Subtree Sizes After Changes
 *
 * In a tree given by `parent`, every node at once moves under its closest
 * ancestor with the same letter, if it has one. Returns the subtree sizes
 * of the new tree.
 *
 * Depth-first search keeping a stack of the nodes on the current path for
 * each letter, which gives each node's new parent. New parents are always
 * ancestors, so adding sizes up in the order nodes are left still works.
 *
 * @see https://leetcode.com/problems/find-subtree-sizes-after-changes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findSubtreeSizesAfterChanges([-1, 0, 0, 1, 1, 1], "abaabc"); // [6, 3, 1, 1, 1, 1]
 */
export const findSubtreeSizesAfterChanges = (
	parent: readonly number[],
	s: string,
): number[] => {
	const n = parent.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let node = 1; node < n; node++) children[parent[node] ?? 0]?.push(node);
	const onPath: number[][] = Array.from({ length: 26 }, () => []);
	const newParent = new Int32Array(n).fill(-1);
	const size = new Int32Array(n).fill(1);
	const stack: [node: number, next: number][] = [[0, 0]];
	onPath[s.charCodeAt(0) - 97]?.push(0);
	while (stack.length > 0) {
		const top = stack.at(-1);
		if (!top) break;
		const [node, next] = top;
		const kids = children[node] ?? [];
		if (next < kids.length) {
			top[1]++;
			const child = kids[next] ?? 0;
			const path = onPath[s.charCodeAt(child) - 97];
			newParent[child] = path?.at(-1) ?? node;
			path?.push(child);
			stack.push([child, 0]);
		} else {
			stack.pop();
			onPath[s.charCodeAt(node) - 97]?.pop();
			const up = newParent[node] ?? -1;
			if (up >= 0) size[up] = (size[up] ?? 0) + (size[node] ?? 0);
		}
	}
	return [...size];
};
