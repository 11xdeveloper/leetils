import { describe, expect, it } from "bun:test";
import { type TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { constructBinaryTreeFromString as str2tree } from ".";

/** Writes a tree in the problem's format. A lone right child isn't representable, so it moves left. */
const toText = (node: TreeNode | null): string => {
	if (!node) return "";
	const children = [node.left, node.right].filter((child) => child !== null);
	return `${node.val}${children.map((child) => `(${toText(child)})`).join("")}`;
};

describe("536. Construct Binary Tree from String", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(str2tree("4(2(3)(1))(6(5))"))).toEqual([
			4, 2, 6, 3, 1, 5,
		]);
		expect(treeToArray(str2tree("4(2(3)(1))(6(5)(7))"))).toEqual([
			4, 2, 6, 3, 1, 5, 7,
		]);
		expect(treeToArray(str2tree("-4(2(3)(1))(6(5)(7))"))).toEqual([
			-4, 2, 6, 3, 1, 5, 7,
		]);
		expect(str2tree("")).toBeNull();
	});

	it("round-trips random trees with multi-digit and negative values", () => {
		const random = createRandom(536);
		for (let run = 0; run < 500; run++) {
			const text = toText(randomTree(random, 20, -1000, 1000));
			expect(toText(str2tree(text))).toBe(text);
		}
	});

	it("handles very deep nesting", () => {
		const text = `${"1(".repeat(10_000)}1${")".repeat(10_000)}`;
		let depth = 0;
		for (let node = str2tree(text); node; node = node.left) depth++;
		expect(depth).toBe(10_001);
	});
});
