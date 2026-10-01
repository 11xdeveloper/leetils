import { describe, expect, it } from "bun:test";
import {
	type NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";
import { createRandom } from "../../testing/random";
import { findRootOfNAryTree as findRoot } from ".";

const nodesOf = (root: NaryTreeNode | null): NaryTreeNode[] =>
	root ? [root, ...root.children.flatMap(nodesOf)] : [];

describe("1506. Find Root of N-Ary Tree", () => {
	it("solves the examples from the problem statement", () => {
		const random = createRandom(1506);
		for (const values of [
			[1, null, 3, 2, 4, null, 5, 6],
			[
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
			],
		]) {
			const root = naryTreeFromArray(values);
			const shuffled = nodesOf(root).sort(() => random.next() - 0.5);
			const found = findRoot(shuffled);
			expect(found).toBe(root);
			expect(naryTreeToArray(found)).toEqual(values);
		}
	});

	it("finds a lone node", () => {
		const root = naryTreeFromArray([5]);
		expect(findRoot(nodesOf(root))).toBe(root);
	});
});
