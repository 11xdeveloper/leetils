import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray, treeToArray } from "./tree-node";

describe("TreeNode", () => {
	it("defaults to a leaf holding 0", () => {
		const node = new TreeNode();
		expect(node.val).toBe(0);
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
	});
});

describe("treeFromArray", () => {
	it("reads LeetCode's level-order format, where null is a missing child", () => {
		const root = treeFromArray([1, null, 2, 3]);
		expect(root?.val).toBe(1);
		expect(root?.left).toBeNull();
		expect(root?.right?.val).toBe(2);
		expect(root?.right?.left?.val).toBe(3);
		expect(root?.right?.right).toBeNull();
	});

	it("does not reserve slots for the children of missing nodes", () => {
		const root = treeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2]);
		expect(root?.left?.left?.left?.val).toBe(7);
		expect(root?.left?.left?.right?.val).toBe(2);
		expect(root?.right?.left?.val).toBe(13);
	});

	it("returns null for an empty array or a null root", () => {
		expect(treeFromArray([])).toBeNull();
		expect(treeFromArray([null])).toBeNull();
	});
});

describe("treeToArray", () => {
	it("round-trips with treeFromArray", () => {
		for (const values of [
			[],
			[1],
			[1, null, 2, 3],
			[3, 9, 20, null, null, 15, 7],
			[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
		]) {
			expect(treeToArray(treeFromArray(values))).toEqual(values);
		}
	});
});
