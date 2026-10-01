import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfNodesInTheSubTreeWithTheSameLabel as countSubTrees } from ".";

/** Walks up from every node, crediting each ancestor with a matching label. */
const byBruteForce = (
	n: number,
	edges: number[][],
	labels: string,
): number[] => {
	const parent = new Array<number>(n).fill(-1);
	const seen = new Set([0]);
	const queue = [0];
	for (let i = 0; i < queue.length; i++) {
		const node = queue[i] ?? 0;
		for (const [a = 0, b = 0] of edges) {
			const other = a === node ? b : b === node ? a : -1;
			if (other === -1 || seen.has(other)) continue;
			seen.add(other);
			parent[other] = node;
			queue.push(other);
		}
	}
	const answer = new Array<number>(n).fill(0);
	for (let node = 0; node < n; node++) {
		for (let at = node; at !== -1; at = parent[at] ?? -1) {
			if (labels[at] === labels[node]) answer[at] = (answer[at] ?? 0) + 1;
		}
	}
	return answer;
};

describe("1519. Number of Nodes in the Sub-Tree With the Same Label", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSubTrees(
				7,
				[
					[0, 1],
					[0, 2],
					[1, 4],
					[1, 5],
					[2, 3],
					[2, 6],
				],
				"abaedcd",
			),
		).toEqual([2, 1, 1, 1, 1, 1, 1]);
		expect(
			countSubTrees(
				4,
				[
					[0, 1],
					[1, 2],
					[0, 3],
				],
				"bbbb",
			),
		).toEqual([4, 2, 1, 1]);
		expect(
			countSubTrees(
				5,
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[0, 4],
				],
				"aabab",
			),
		).toEqual([3, 2, 1, 1, 1]);
	});

	it("handles a long path", () => {
		const n = 100000;
		const path = Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
		const answer = countSubTrees(n, path, "a".repeat(n));
		expect(answer[0]).toBe(n);
		expect(answer[n - 1]).toBe(1);
	});

	it("matches walking up from every node on random trees", () => {
		const random = createRandom(1519);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) =>
				[random.int(0, i), i + 1].sort(() => random.next() - 0.5),
			);
			const labels = random.string(n, "abc");
			expect(countSubTrees(n, edges, labels)).toEqual(
				byBruteForce(n, edges, labels),
			);
		}
	});
});
