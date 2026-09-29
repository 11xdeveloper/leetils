import { describe, expect, it } from "bun:test";
import {
	QuadTreeNode,
	quadTreeFromArray,
	quadTreeToArray,
} from "./quad-tree-node";

describe("QuadTreeNode", () => {
	it("defaults to a non-leaf holding false with no children", () => {
		const node = new QuadTreeNode();
		expect(node.val).toBeFalse();
		expect(node.isLeaf).toBeFalse();
		expect(node.topLeft).toBeNull();
	});
});

describe("quadTreeFromArray and quadTreeToArray", () => {
	it("round-trip LeetCode's level-order format", () => {
		for (const values of [
			[],
			[[1, 1]],
			[
				[0, 1],
				[1, 0],
				[1, 1],
				[1, 1],
				[1, 0],
			],
			[
				[0, 1],
				[1, 1],
				[0, 1],
				[1, 1],
				[1, 0],
				null,
				null,
				null,
				null,
				[1, 0],
				[1, 0],
				[1, 1],
				[1, 1],
			],
		] as ([number, number] | null)[][]) {
			expect(quadTreeToArray(quadTreeFromArray(values))).toEqual(values);
		}
	});

	it("puts children in top-left, top-right, bottom-left, bottom-right order", () => {
		const root = quadTreeFromArray([
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 1],
			[1, 0],
		]);
		expect([
			root?.topLeft?.val,
			root?.topRight?.val,
			root?.bottomLeft?.val,
			root?.bottomRight?.val,
		]).toEqual([false, true, true, false]);
	});
});
