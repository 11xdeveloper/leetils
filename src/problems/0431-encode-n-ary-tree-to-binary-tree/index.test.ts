import { describe, expect, it } from "bun:test";
import {
	NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";
import { createRandom } from "../../testing/random";
import { EncodeNAryTreeToBinaryTree as Codec } from ".";

const roundTrip = (root: NaryTreeNode | null): NaryTreeNode | null =>
	new Codec().decode(new Codec().encode(root));

describe("431. Encode N-ary Tree to Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
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
			[],
		]) {
			expect(naryTreeToArray(roundTrip(naryTreeFromArray(values)))).toEqual(
				values,
			);
		}
	});

	it("round-trips random trees, including ones 1000 levels deep", () => {
		const random = createRandom(431);
		for (let run = 0; run < 300; run++) {
			const nodes = [new NaryTreeNode(random.int(0, 100))];
			for (let i = random.int(0, 25); i > 0; i--) {
				const child = new NaryTreeNode(random.int(0, 100));
				nodes[random.int(0, nodes.length - 1)]?.children.push(child);
				nodes.push(child);
			}
			expect(naryTreeToArray(roundTrip(nodes[0] ?? null))).toEqual(
				naryTreeToArray(nodes[0] ?? null),
			);
		}
		const values: (number | null)[] = [0, null];
		for (let depth = 1; depth < 1000; depth++) values.push(depth, null);
		expect(naryTreeToArray(roundTrip(naryTreeFromArray(values)))).toEqual(
			naryTreeToArray(naryTreeFromArray(values)),
		);
	});
});
