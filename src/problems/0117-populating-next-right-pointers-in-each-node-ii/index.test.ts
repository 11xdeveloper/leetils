import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import {
	nextPointersToArray,
	treeWithNextFromArray,
} from "../../structures/tree-node-with-next";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreeLevelOrderTraversal } from "../0102-binary-tree-level-order-traversal";
import { populatingNextRightPointersInEachNodeII as connect } from ".";

describe("117. Populating Next Right Pointers in Each Node II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nextPointersToArray(
				connect(treeWithNextFromArray([1, 2, 3, 4, 5, null, 7])),
			),
		).toEqual([1, "#", 2, 3, "#", 4, 5, 7, "#"]);
		expect(connect(null)).toBeNull();
	});

	it("links nodes across gaps in a level", () => {
		expect(
			nextPointersToArray(
				connect(treeWithNextFromArray([1, 2, 3, 4, null, null, 5])),
			),
		).toEqual([1, "#", 2, 3, "#", 4, 5, "#"]);
	});

	it("matches the level order traversal on random trees", () => {
		const random = createRandom(117);
		for (let run = 0; run < 500; run++) {
			const plain = randomTree(random, 30, 0, 9);
			const levels = binaryTreeLevelOrderTraversal(plain);
			const root = connect(treeWithNextFromArray(treeToArray(plain)));
			expect(nextPointersToArray(root)).toEqual(
				levels.flatMap((level) => [...level, "#"]),
			);
		}
	});
});
