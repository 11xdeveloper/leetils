import { describe, expect, it } from "bun:test";
import type { TreeNode } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { verifyPreorderSerializationOfABinaryTree as verify } from ".";

const serialize = (node: TreeNode | null): string[] =>
	node
		? [String(node.val), ...serialize(node.left), ...serialize(node.right)]
		: ["#"];

describe("331. Verify Preorder Serialization of a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(verify("9,3,4,#,#,1,#,#,2,#,6,#,#")).toBeTrue();
		expect(verify("1,#")).toBeFalse();
		expect(verify("9,#,#,1")).toBeFalse();
	});

	it("accepts the empty tree", () => {
		expect(verify("#")).toBeTrue();
	});

	it("accepts serializations of random trees, and rejects them with a token added or removed", () => {
		const random = createRandom(331);
		for (let run = 0; run < 500; run++) {
			const tokens = serialize(randomTree(random, 15, 0, 99));
			expect(verify(tokens.join(","))).toBeTrue();
			expect(verify([...tokens, "#"].join(","))).toBeFalse();
			expect(verify(tokens.slice(0, -1).join(",") || "1")).toBeFalse();
		}
	});
});
