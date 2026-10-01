import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf } from "../../testing/trees";
import { recoverBinarySearchTree } from ".";

const recover = (values: (number | null)[]): (number | null)[] => {
	const root = treeFromArray(values);
	expect(recoverBinarySearchTree(root)).toBeUndefined();
	return treeToArray(root);
};

describe("99. Recover Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(recover([1, 3, null, null, 2])).toEqual([3, 1, null, null, 2]);
		expect(recover([3, 1, 4, null, null, 2])).toEqual([2, 1, 4, null, null, 3]);
	});

	it("fixes adjacent swapped values", () => {
		expect(recover([1, 2])).toEqual([2, 1]);
		expect(recover([2, null, 1])).toEqual([1, null, 2]);
	});

	it("restores random binary search trees with two values swapped, keeping their shape", () => {
		const random = createRandom(99);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues(random.array(random.int(2, 20), -100, 100));
			const nodes = nodesOf(root);
			if (nodes.length < 2) continue;
			const expected = treeToArray(root);

			const i = random.int(0, nodes.length - 1);
			let j = random.int(0, nodes.length - 2);
			if (j >= i) j++;
			const [a, b] = [nodes[i], nodes[j]];
			if (!a || !b) continue;
			[a.val, b.val] = [b.val, a.val];

			recoverBinarySearchTree(root);
			expect(treeToArray(root)).toEqual(expected);
		}
	});
});
