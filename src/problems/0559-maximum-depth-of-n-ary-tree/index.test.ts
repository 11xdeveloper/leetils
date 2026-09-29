import { describe, expect, it } from "bun:test";
import {
	NaryTreeNode,
	naryTreeFromArray,
} from "../../structures/nary-tree-node";
import { maximumDepthOfNAryTree as maxDepth } from ".";

describe("559. Maximum Depth of N-ary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDepth(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]))).toBe(3);
		expect(
			maxDepth(
				naryTreeFromArray([
					1,
					null,
					2,
					3,
					4,
					5,
					null,
					null,
					6,
					7,
					null,
					8,
					null,
					9,
					10,
					null,
					null,
					11,
					null,
					12,
					null,
					13,
					null,
					null,
					14,
				]),
			),
		).toBe(5);
		expect(maxDepth(null)).toBe(0);
	});

	it("handles a very deep tree", () => {
		const root = new NaryTreeNode(0);
		let node = root;
		for (let i = 1; i < 10_000; i++) {
			const child = new NaryTreeNode(i);
			node.children.push(child);
			node = child;
		}
		expect(maxDepth(root)).toBe(10_000);
	});
});
