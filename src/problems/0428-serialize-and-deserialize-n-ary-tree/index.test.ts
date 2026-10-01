import { describe, expect, it } from "bun:test";
import {
	NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";
import { createRandom, type Random } from "../../testing/random";
import { SerializeAndDeserializeNAryTree as Codec } from ".";

const roundTrip = (root: NaryTreeNode | null): NaryTreeNode | null =>
	new Codec().deserialize(new Codec().serialize(root));

const randomNaryTree = (
	random: Random,
	maxSize: number,
): NaryTreeNode | null => {
	const size = random.int(0, maxSize);
	if (size === 0) return null;
	const nodes = [new NaryTreeNode(random.int(0, 100))];
	while (nodes.length < size) {
		const child = new NaryTreeNode(random.int(0, 100));
		nodes[random.int(0, nodes.length - 1)]?.children.push(child);
		nodes.push(child);
	}
	return nodes[0] ?? null;
};

describe("428. Serialize and Deserialize N-ary Tree", () => {
	it("solves the examples from the problem statement", () => {
		for (const values of [
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
			[1, null, 3, 2, 4, null, 5, 6],
			[],
		]) {
			expect(naryTreeToArray(roundTrip(naryTreeFromArray(values)))).toEqual(
				values,
			);
		}
	});

	it("round-trips random trees", () => {
		const random = createRandom(428);
		for (let run = 0; run < 500; run++) {
			const root = randomNaryTree(random, 25);
			expect(naryTreeToArray(roundTrip(root))).toEqual(naryTreeToArray(root));
		}
	});
});
