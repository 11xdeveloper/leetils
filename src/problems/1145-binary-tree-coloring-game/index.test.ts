import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom, type Random } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeColoringGame as btreeGameWinningMove } from ".";

/** Plays the game out exhaustively: whether the second player can force a win after naming y. */
const byBruteForce = (root: TreeNode, x: number): boolean => {
	const nodes = nodesOf(root);
	const index = new Map(nodes.map((node, i) => [node, i]));
	const neighbours = nodes.map((): number[] => []);
	for (const node of nodes) {
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			const [a, b] = [index.get(node) ?? 0, index.get(child) ?? 0];
			neighbours[a]?.push(b);
			neighbours[b]?.push(a);
		}
	}
	const xIndex = nodes.findIndex((node) => node.val === x);
	// Returns red's count minus blue's under best play, with `turn` 0 for red.
	const memo = new Map<string, number>();
	const play = (colours: number[], turn: number, passed: boolean): number => {
		const key = `${colours.join("")}${turn}${passed}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const mine = turn + 1;
		const moves = new Set<number>();
		colours.forEach((colour, i) => {
			if (colour !== mine) return;
			for (const j of neighbours[i] ?? []) if (colours[j] === 0) moves.add(j);
		});
		let result: number;
		if (moves.size === 0) {
			if (passed) {
				result =
					colours.filter((c) => c === 1).length -
					colours.filter((c) => c === 2).length;
			} else result = play(colours, 1 - turn, true);
		} else {
			const outcomes = [...moves].map((j) => {
				const next = [...colours];
				next[j] = mine;
				return play(next, 1 - turn, false);
			});
			result = turn === 0 ? Math.max(...outcomes) : Math.min(...outcomes);
		}
		memo.set(key, result);
		return result;
	};
	return nodes.some((_, y) => {
		if (y === xIndex) return false;
		const colours = nodes.map(() => 0);
		colours[xIndex] = 1;
		colours[y] = 2;
		return play(colours, 0, false) < 0;
	});
};

/** A random tree with an odd number of nodes, valued 1 to n. */
const randomOddTree = (random: Random): TreeNode => {
	for (;;) {
		const root = randomTree(random, 9, 0, 0);
		const nodes = nodesOf(root);
		if (!root || nodes.length % 2 === 0) continue;
		nodes.forEach((node, i) => {
			node.val = i + 1;
		});
		return root;
	}
};

describe("1145. Binary Tree Coloring Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			btreeGameWinningMove(
				treeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
				11,
				3,
			),
		).toBeTrue();
		expect(btreeGameWinningMove(treeFromArray([1, 2, 3]), 3, 1)).toBeFalse();
	});

	it("handles a single node", () => {
		expect(btreeGameWinningMove(treeFromArray([1]), 1, 1)).toBeFalse();
	});

	it("matches playing the game out on random trees", () => {
		const random = createRandom(1145);
		for (let run = 0; run < 150; run++) {
			const root = randomOddTree(random);
			const n = nodesOf(root).length;
			const x = random.int(1, n);
			expect(btreeGameWinningMove(root, n, x)).toBe(byBruteForce(root, x));
		}
	});
});
