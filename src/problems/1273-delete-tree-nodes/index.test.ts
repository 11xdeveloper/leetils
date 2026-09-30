import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deleteTreeNodes } from ".";

/** Checks each node's subtree sum, and whether any ancestor's subtree was removed. */
const byBruteForce = (
	nodes: number,
	parent: number[],
	value: number[],
): number => {
	const inSubtree = (node: number, root: number): boolean => {
		for (let at = node; at !== -1; at = parent[at] ?? -1)
			if (at === root) return true;
		return false;
	};
	const removed = Array.from({ length: nodes }, (_, root) => {
		let sum = 0;
		for (let node = 0; node < nodes; node++)
			if (inSubtree(node, root)) sum += value[node] ?? 0;
		return sum === 0;
	});
	let remaining = 0;
	for (let node = 0; node < nodes; node++) {
		let gone = false;
		for (let at = node; at !== -1; at = parent[at] ?? -1)
			if (removed[at]) gone = true;
		if (!gone) remaining++;
	}
	return remaining;
};

describe("1273. Delete Tree Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			deleteTreeNodes(7, [-1, 0, 0, 1, 2, 2, 2], [1, -2, 4, 0, -2, -1, -1]),
		).toBe(2);
		expect(
			deleteTreeNodes(7, [-1, 0, 0, 1, 2, 2, 2], [1, -2, 4, 0, -2, -1, -2]),
		).toBe(6);
	});

	it("handles parents listed after their children", () => {
		expect(deleteTreeNodes(3, [-1, 2, 0], [1, 3, -3])).toBe(1);
	});

	it("matches checking every subtree on random trees", () => {
		const random = createRandom(1273);
		for (let run = 0; run < 300; run++) {
			const nodes = random.int(1, 9);
			// Label a random tree with shuffled indices so parents can come later.
			const labels = [
				0,
				...Array.from({ length: nodes - 1 }, (_, i) => i + 1).sort(
					() => random.next() - 0.5,
				),
			];
			const parent = new Array<number>(nodes).fill(-1);
			for (let i = 1; i < nodes; i++)
				parent[labels[i] ?? 0] = labels[random.int(0, i - 1)] ?? 0;
			const value = random.array(nodes, -2, 2);
			expect(deleteTreeNodes(nodes, parent, value)).toBe(
				byBruteForce(nodes, parent, value),
			);
		}
	});
});
