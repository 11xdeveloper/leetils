import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf } from "../../testing/trees";
import { distributeCoinsInBinaryTree as distributeCoins } from ".";

/** Breadth-first search over coin distributions, moving one coin along an edge at a time. */
const bySearch = (root: TreeNode): number => {
	const nodes = nodesOf(root);
	const index = new Map(nodes.map((node, i) => [node, i]));
	const edges = nodes.flatMap((node) =>
		[node.left, node.right]
			.filter((child) => child !== null)
			.map((child) => [index.get(node) ?? 0, index.get(child) ?? 0]),
	);
	const start = nodes.map((node) => node.val);
	const seen = new Set([start.join()]);
	let frontier = [start];
	for (let moves = 0; ; moves++) {
		const next: number[][] = [];
		for (const state of frontier) {
			if (state.every((coins) => coins === 1)) return moves;
			for (const [a = 0, b = 0] of edges) {
				for (const [from, to] of [
					[a, b],
					[b, a],
				] as const) {
					if ((state[from] ?? 0) === 0) continue;
					const moved = [...state];
					moved[from] = (moved[from] ?? 0) - 1;
					moved[to] = (moved[to] ?? 0) + 1;
					if (!seen.has(moved.join())) {
						seen.add(moved.join());
						next.push(moved);
					}
				}
			}
		}
		frontier = next;
	}
};

describe("979. Distribute Coins in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCoins(treeFromArray([3, 0, 0]))).toBe(2);
		expect(distributeCoins(treeFromArray([0, 3, 0]))).toBe(3);
	});

	it("matches searching every sequence of moves on small random trees", () => {
		const random = createRandom(979);
		for (let run = 0; run < 100; run++) {
			const values = Array.from({ length: random.int(1, 5) }, () => 0);
			for (let coin = 0; coin < values.length; coin++) {
				const at = random.int(0, values.length - 1);
				values[at] = (values[at] ?? 0) + 1;
			}
			const root = treeFromArray(values);
			if (root) expect(distributeCoins(root)).toBe(bySearch(root));
		}
	});
});
