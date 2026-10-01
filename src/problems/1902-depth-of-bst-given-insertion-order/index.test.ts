import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { depthOfBstGivenInsertionOrder as maxDepthBST } from ".";

/** Inserts into an actual binary search tree. */
const byBruteForce = (order: number[]): number => {
	const left = new Map<number, number>();
	const right = new Map<number, number>();
	let deepest = 0;
	for (const [i, value] of order.entries()) {
		if (i === 0) {
			deepest = 1;
			continue;
		}
		let [node, depth] = [order[0] ?? 0, 1];
		for (;;) {
			const side = value < node ? left : right;
			const child = side.get(node);
			depth++;
			if (child === undefined) {
				side.set(node, value);
				break;
			}
			node = child;
		}
		deepest = Math.max(deepest, depth);
	}
	return deepest;
};

describe("1902. Depth of BST Given Insertion Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDepthBST([2, 1, 4, 3])).toBe(3);
		expect(maxDepthBST([2, 1, 3, 4])).toBe(3);
		expect(maxDepthBST([1, 2, 3, 4])).toBe(4);
	});

	it("matches building the tree on random permutations", () => {
		const random = createRandom(1902);
		for (let run = 0; run < 300; run++) {
			const order = Array.from({ length: random.int(1, 15) }, (_, i) => i + 1);
			for (let i = order.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[order[i], order[j]] = [order[j] ?? 0, order[i] ?? 0];
			}
			expect(maxDepthBST(order)).toBe(byBruteForce(order));
		}
	});
});
