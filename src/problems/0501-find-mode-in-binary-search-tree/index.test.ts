import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { findModeInBinarySearchTree as findMode } from ".";

/** Inserts values into a binary search tree in order, sending duplicates right. */
const bstWithDuplicates = (values: number[]): TreeNode | null => {
	let root: TreeNode | null = null;
	for (const value of values) {
		const node = new TreeNode(value);
		if (!root) {
			root = node;
			continue;
		}
		for (let current = root; ; ) {
			const side = value < current.val ? "left" : "right";
			const child = current[side];
			if (!child) {
				current[side] = node;
				break;
			}
			current = child;
		}
	}
	return root;
};

const byCounting = (values: number[]): number[] => {
	const counts = new Map<number, number>();
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
	const most = Math.max(...counts.values());
	return [...counts]
		.filter(([, count]) => count === most)
		.map(([value]) => value)
		.sort((a, b) => a - b);
};

describe("501. Find Mode in Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMode(treeFromArray([1, null, 2, 2]))).toEqual([2]);
		expect(findMode(treeFromArray([0]))).toEqual([0]);
	});

	it("matches counting every value on random trees with duplicates", () => {
		const random = createRandom(501);
		for (let run = 0; run < 500; run++) {
			const values = random.array(random.int(1, 30), 0, 8);
			expect(findMode(bstWithDuplicates(values))).toEqual(byCounting(values));
		}
	});

	it("handles a very deep tree", () => {
		const values = Array.from({ length: 10_000 }, (_, i) => Math.floor(i / 2));
		expect(findMode(bstWithDuplicates(values))).toHaveLength(5000);
	});
});
