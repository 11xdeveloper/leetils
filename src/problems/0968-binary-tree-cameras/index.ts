import type { TreeNode } from "../../structures/tree-node";

/**
 * 968. Binary Tree Cameras
 *
 * A camera on a node watches it, its parent and its children. Returns the
 * fewest cameras that watch every node of the binary tree.
 *
 * Greedy from the leaves up: a camera is placed on a node only when a child
 * is unwatched, since placing it higher always covers at least as much.
 * Each node reports whether it has a camera, is watched, or needs
 * watching; the root is handled last. Postorder with an explicit stack.
 *
 * @see https://leetcode.com/problems/binary-tree-cameras/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeCameras(treeFromArray([0, 0, null, 0, 0])); // 1
 */
export const binaryTreeCameras = (root: TreeNode | null): number => {
	const NEEDS_WATCHING = 0;
	const WATCHED = 1;
	const HAS_CAMERA = 2;
	const state = new Map<TreeNode | null, number>([[null, WATCHED]]);
	let cameras = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const [left, right] = [state.get(node.left), state.get(node.right)];
		if (left === NEEDS_WATCHING || right === NEEDS_WATCHING) {
			cameras++;
			state.set(node, HAS_CAMERA);
		} else if (left === HAS_CAMERA || right === HAS_CAMERA) {
			state.set(node, WATCHED);
		} else {
			state.set(node, NEEDS_WATCHING);
		}
	}
	return state.get(root) === NEEDS_WATCHING ? cameras + 1 : cameras;
};
