import { describe, expect, it } from "bun:test";
import { RopeTreeNode, ropeTreeFromArray } from "./rope-tree-node";

describe("RopeTreeNode", () => {
	it("defaults to an empty leaf with no children", () => {
		const node = new RopeTreeNode();
		expect(node.len).toBe(0);
		expect(node.val).toBe("");
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
	});
});

describe("ropeTreeFromArray", () => {
	it("returns null for an empty array", () => {
		expect(ropeTreeFromArray([])).toBeNull();
	});

	it("makes strings leaves and numbers internal nodes", () => {
		const root = ropeTreeFromArray([10, 4, "abcpoe", "g", "rta"]);
		expect(root?.len).toBe(10);
		expect(root?.left?.len).toBe(4);
		expect(root?.left?.left?.val).toBe("g");
		expect(root?.left?.right?.val).toBe("rta");
		expect(root?.right?.val).toBe("abcpoe");
		expect(root?.right?.len).toBe(0);
	});

	it("skips missing children", () => {
		const root = ropeTreeFromArray([3, null, "abc"]);
		expect(root?.left).toBeNull();
		expect(root?.right?.val).toBe("abc");
	});
});
