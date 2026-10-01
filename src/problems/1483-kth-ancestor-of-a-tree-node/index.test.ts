import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { KthAncestorOfATreeNode as TreeAncestor } from ".";

describe("1483. Kth Ancestor of a Tree Node", () => {
	it("solves the example from the problem statement", () => {
		const tree = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
		expect(tree.getKthAncestor(3, 1)).toBe(1);
		expect(tree.getKthAncestor(5, 2)).toBe(0);
		expect(tree.getKthAncestor(6, 3)).toBe(-1);
	});

	it("handles a long chain", () => {
		const n = 50000;
		const tree = new TreeAncestor(
			n,
			Array.from({ length: n }, (_, i) => i - 1),
		);
		expect(tree.getKthAncestor(n - 1, n - 1)).toBe(0);
		expect(tree.getKthAncestor(n - 1, n)).toBe(-1);
		expect(tree.getKthAncestor(n - 1, 12345)).toBe(n - 1 - 12345);
	});

	it("matches stepping up one parent at a time on random trees", () => {
		const random = createRandom(1483);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 30);
			const parent = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const tree = new TreeAncestor(n, parent);
			for (let query = 0; query < 20; query++) {
				const [node, k] = [random.int(0, n - 1), random.int(1, n)];
				let expected = node;
				for (let step = 0; step < k && expected !== -1; step++)
					expected = parent[expected] ?? -1;
				expect(tree.getKthAncestor(node, k)).toBe(expected);
			}
		}
	});
});
