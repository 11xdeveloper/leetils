import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { minimumAbsoluteDifferenceInBst } from "../0530-minimum-absolute-difference-in-bst";
import { minimumDistanceBetweenBstNodes as minDiffInBST } from ".";

describe("783. Minimum Distance Between BST Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDiffInBST(treeFromArray([4, 2, 6, 1, 3]))).toBe(1);
		expect(minDiffInBST(treeFromArray([1, 0, 48, null, null, 12, 49]))).toBe(1);
	});

	it("agrees with Minimum Absolute Difference in BST, the same problem", () => {
		const random = createRandom(783);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues([
				...new Set(random.array(random.int(2, 30), 0, 1000)),
			]);
			expect(minDiffInBST(root)).toBe(minimumAbsoluteDifferenceInBst(root));
		}
	});
});
