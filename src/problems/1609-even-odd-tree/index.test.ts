import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { evenOddTree as isEvenOddTree } from ".";

/** Collects each level recursively, then checks it. */
const byBruteForce = (root: TreeNode | null): boolean => {
	const levels: number[][] = [];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		const level = levels[depth] ?? [];
		levels[depth] = level;
		level.push(node.val);
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return levels.every((values, depth) =>
		values.every((v, i) =>
			depth % 2 === 0
				? v % 2 === 1 && (i === 0 || v > (values[i - 1] ?? 0))
				: v % 2 === 0 && (i === 0 || v < (values[i - 1] ?? 0)),
		),
	);
};

describe("1609. Even Odd Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isEvenOddTree(
				treeFromArray([1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2]),
			),
		).toBeTrue();
		expect(isEvenOddTree(treeFromArray([5, 4, 2, 3, 3, 7]))).toBeFalse();
		expect(isEvenOddTree(treeFromArray([5, 9, 1, 3, 5, 7]))).toBeFalse();
	});

	it("matches checking each level on random trees", () => {
		const random = createRandom(1609);
		for (let run = 0; run < 400; run++) {
			const root = randomTree(random, 8, 1, 12);
			expect(isEvenOddTree(root)).toBe(byBruteForce(root));
		}
	});
});
