import { describe, expect, it } from "bun:test";
import {
	TreeNodeWithParent,
	treeWithParentFromArray,
} from "./tree-node-with-parent";

describe("TreeNodeWithParent", () => {
	it("defaults to a leaf holding 0 with no parent", () => {
		const node = new TreeNodeWithParent();
		expect(node.val).toBe(0);
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
		expect(node.parent).toBeNull();
	});
});

describe("treeWithParentFromArray", () => {
	it("reads LeetCode's level-order format and links every node to its parent", () => {
		const root = treeWithParentFromArray([5, 3, 6, 2, 4, null, null, 1]);
		expect(root?.parent).toBeNull();
		expect(root?.left?.val).toBe(3);
		expect(root?.left?.parent).toBe(root);
		expect(root?.right?.parent).toBe(root);
		expect(root?.left?.left?.left?.val).toBe(1);
		expect(root?.left?.left?.left?.parent).toBe(root?.left?.left ?? null);
		expect(root?.left?.right?.parent).toBe(root?.left ?? null);
	});

	it("returns null for an empty array", () => {
		expect(treeWithParentFromArray([])).toBeNull();
	});
});
