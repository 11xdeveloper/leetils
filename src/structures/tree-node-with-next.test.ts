import { describe, expect, it } from "bun:test";
import {
	nextPointersToArray,
	TreeNodeWithNext,
	treeWithNextFromArray,
} from "./tree-node-with-next";

describe("TreeNodeWithNext", () => {
	it("defaults to a leaf holding 0 with no next node", () => {
		const node = new TreeNodeWithNext();
		expect(node.val).toBe(0);
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
		expect(node.next).toBeNull();
	});
});

describe("treeWithNextFromArray", () => {
	it("reads LeetCode's level-order format with every next pointer null", () => {
		const root = treeWithNextFromArray([1, 2, 3, null, 5]);
		expect(root?.left?.right?.val).toBe(5);
		expect(root?.right?.val).toBe(3);
		expect(root?.left?.next).toBeNull();
	});

	it("returns null for an empty array", () => {
		expect(treeWithNextFromArray([])).toBeNull();
	});
});

describe("nextPointersToArray", () => {
	it("reads each level by following next pointers", () => {
		const root = treeWithNextFromArray([1, 2, 3]);
		if (root?.left) root.left.next = root.right;
		expect(nextPointersToArray(root)).toEqual([1, "#", 2, 3, "#"]);
	});

	it("only sees what next pointers connect", () => {
		expect(nextPointersToArray(treeWithNextFromArray([1, 2, 3]))).toEqual([
			1,
			"#",
			2,
			"#",
		]);
	});

	it("returns an empty array for an empty tree", () => {
		expect(nextPointersToArray(null)).toEqual([]);
	});
});
