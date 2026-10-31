import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheNumberOfTargetNodesAfterConnectingTreesII as maxTargetNodes } from ".";

/** Joins every pair of nodes and counts targets by breadth-first search. */
const byBruteForce = (
	edges1: number[][],
	edges2: number[][],
	k: number,
): number[] => {
	const n = edges1.length + 1;
	const m = edges2.length + 1;
	const isTarget = (d: number) => d % 2 === 0;
	return Array.from({ length: n }, (_, i) => {
		let best = 0;
		for (let j = 0; j < m; j++) {
			const adjacent: number[][] = Array.from({ length: n + m }, () => []);
			for (const [u = 0, v = 0] of edges1) {
				adjacent[u]?.push(v);
				adjacent[v]?.push(u);
			}
			for (const [u = 0, v = 0] of edges2) {
				adjacent[n + u]?.push(n + v);
				adjacent[n + v]?.push(n + u);
			}
			adjacent[i]?.push(n + j);
			adjacent[n + j]?.push(i);
			const distance = new Array<number>(n + m).fill(-1);
			distance[i] = 0;
			const queue = [i];
			for (let q = 0; q < queue.length; q++)
				for (const next of adjacent[queue[q] ?? 0] ?? [])
					if (distance[next] === -1) {
						distance[next] = (distance[queue[q] ?? 0] ?? 0) + 1;
						queue.push(next);
					}
			best = Math.max(best, distance.filter(isTarget).length);
		}
		return best;
	});
};

describe("3373. Maximize the Number of Target Nodes After Connecting Trees II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxTargetNodes(
				[
					[0, 1],
					[0, 2],
					[2, 3],
					[2, 4],
				],
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[2, 7],
					[1, 4],
					[4, 5],
					[4, 6],
				],
			),
		).toEqual([8, 7, 7, 8, 8]);
		expect(
			maxTargetNodes(
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[0, 4],
				],
				[
					[0, 1],
					[1, 2],
					[2, 3],
				],
			),
		).toEqual([3, 6, 6, 6, 6]);
	});

	it("matches joining every pair on random trees", () => {
		const random = createRandom(3373);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 7);
			const m = random.int(2, 7);
			const edges1 = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const edges2 = Array.from({ length: m - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const k = random.int(0, 4);
			expect(maxTargetNodes(edges1, edges2)).toEqual(
				byBruteForce(edges1, edges2, k),
			);
		}
	});
});
