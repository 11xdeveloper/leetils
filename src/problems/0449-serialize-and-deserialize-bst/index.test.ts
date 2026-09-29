import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { SerializeAndDeserializeBst as Codec } from ".";

const roundTrip = (root: TreeNode | null): TreeNode | null =>
	new Codec().deserialize(new Codec().serialize(root));

describe("449. Serialize and Deserialize BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(roundTrip(treeFromArray([2, 1, 3])))).toEqual([2, 1, 3]);
		expect(roundTrip(null)).toBeNull();
	});

	it("writes only the values, in preorder", () => {
		expect(new Codec().serialize(treeFromArray([5, 3, 8, 1, 4]))).toBe(
			"5,3,1,4,8",
		);
	});

	it("round-trips random binary search trees", () => {
		const random = createRandom(449);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues(random.array(random.int(0, 40), 0, 10_000));
			expect(treeToArray(roundTrip(root))).toEqual(treeToArray(root));
		}
	});
});
