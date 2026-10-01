import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { FindElementsInAContaminatedBinaryTree as FindElements } from ".";

describe("1261. Find Elements in a Contaminated Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		const first = new FindElements(treeFromArray([-1, null, -1]));
		expect([1, 2].map((t) => first.find(t))).toEqual([false, true]);
		const second = new FindElements(treeFromArray([-1, -1, -1, -1, -1]));
		expect([1, 3, 5].map((t) => second.find(t))).toEqual([true, true, false]);
		const third = new FindElements(treeFromArray([-1, null, -1, -1, null, -1]));
		expect([2, 3, 4, 5].map((t) => third.find(t))).toEqual([
			true,
			false,
			false,
			true,
		]);
	});

	it("finds exactly the recovered values of random trees", () => {
		const random = createRandom(1261);
		for (let run = 0; run < 200; run++) {
			const root = randomTree(random, 20, 0, 0) ?? treeFromArray([0]);
			// Label the tree correctly first, then contaminate it.
			const label = (node: TreeNode | null, value: number): void => {
				if (!node) return;
				node.val = value;
				label(node.left, 2 * value + 1);
				label(node.right, 2 * value + 2);
			};
			label(root, 0);
			const values = new Set(nodesOf(root).map((node) => node.val));
			for (const node of nodesOf(root)) node.val = -1;
			const elements = new FindElements(root);
			for (let target = 0; target <= 2000; target++) {
				expect(elements.find(target)).toBe(values.has(target));
			}
		}
	});
});
